require('dotenv').config();
require("./lib/FileClient");

const path = require('path');

/**
 * Kernel is a central part of the app that Handles deploy process on terminal command.
 * 
 * @param {Object} Logger
 * @param {Object} KafkaClient 
 * @param {Object} AWSQSClient
 * @param {Object} ShellCommand
 */
module.exports = (function(Logger, ShellCommand, KafkaClient, AWSSqsClient, AWSS3Client){
  
    /**
     * Define Project Root Directory
     */
    const PROJECT_ROOT = path.join(process.cwd(), 'output');

    /**
     * Init install shell command
     */
    const _installCommand = new ShellCommand();

    /**
     * Init build shell command
     */
    const _buildCommand = new ShellCommand();

    /**
     * Upload to aws s3
     * 
     * @param {File} file 
     * @param {String} filePath 
     */
    const upload = async (file, filePath) => {
        await KafkaClient.publish(`===== uploading file: ${file}....=====\n\n`);
        await AWSS3Client.upload({
            filePath: filePath,
            key: `${process.env.PROJECT_ID}-v${process.env.VERSION}/${file}`,
            bucket: process.env.ROOT_UPLAOD_BUCKET
        });
        await KafkaClient.publish(`===== uploaded file: ${file}=====\n\n`);
    };

    /**
     * Hnadle error
     * 
     * @param {Object} error 
     */
    const onHandleError = async (error) => {
        /**
         * Send to system log server
         */
        await Logger.queueLog(error, {
            projectId: process.env.PROJECT_ID, 
            uuid: process.env.UUID,
            stage: process.env.stage,
            processId: process.env.PROCESS_ID,
            version: process.env.VERSION,
            authorEmail: process.env.AUTHOR_EMAIL,
            provider: process.env.ORG_PROVIDER,
        });

        /**
         * Destroy all connection and notify to client
         */
        await finalize("error", `error: ${error.toString()}`);
    }

    /**
     * Capture install command output
     */
    _installCommand
    .on('onCaptureData', async (data) => {
        try{
            /**
             * Publish captured output to kafka server
             */
            await KafkaClient.publish(data.toString());
        }catch(error){
           await onHandleError(error);
        }
    });

    /**
     * Handle install command console error
     */
    _installCommand
    .on('onCaptureError', async (error) => {
        await onHandleError(error);
    });

    /**
     * Handle after suuccessfully process install command
     */
    _installCommand
    .on('onCaptureClose', async () => {
        await KafkaClient.publish("==== Installing Done =======\n\n");

        /**
         *  Execute build command
         */
        await KafkaClient.publish("==== Start Building.... =======\n\n");
        await _buildCommand.execute(`npm run build`, {
            shell: true,
            cwd: PROJECT_ROOT
        });
    });


    /**
     * Capture console build command output
     */
    _buildCommand
    .on('onCaptureData', async (data) => {
        try{
            /**
             * Publish captured output to kafka server
             */
            await KafkaClient.publish(data.toString());
        }catch(error){
           await onHandleError(error);
        }
    });

    /**
     * Handle console error
     */
    _buildCommand
    .on('onCaptureError', async (error) => {
        await onHandleError(error);
    });

    /**
     * Handle after suuccessfully process command
     */
    _buildCommand
    .on('onCaptureClose', async () => {
        try{
            console.log("CWD: " + path.join(PROJECT_ROOT, 'build'));
            /**
             * Build path
             */
            const buildPath = path.join(PROJECT_ROOT, 'build');

            if(! FileClient.exists(buildPath)){
                throw new Error(`Project: ${process.env.PROJECT_ID} build failed. Due to build directory not found Or build failed!`)
            }

            await KafkaClient.publish(`====== Build successfully. ======\n\n`);

            /**
             * Read all file from build directory
             */
            const buildFiles = FileClient.readDir(buildPath, true);

            /**
             * Prepare upload process for executing concurrently
             */
            await KafkaClient.publish(`====== Upload preparing....=======\n\n`);
            const uploadPromises = [];

            for(const file of buildFiles){
                const filePath = `${buildPath}/${file}`;
                if(FileClient.isDirectory(filePath)) continue;
                uploadPromises.push(upload(file, filePath));
            }

            /**
             * Execute Upload promises to upload build file
             */
            await Promise.all(uploadPromises);

            /**
             * Send to client active console
             */
            await KafkaClient.publish(`===== uploading done =====\n\n`);
            
            /**
             * Destroy and send notification to client after done
             */
            await finalize("done", `===== Preview: http://${process.env.PROJECT_ID}.${process.env.DOMAIN_NAME}:5003 ====`);
        }catch(error){
         await onHandleError(error);
        }
    });

    /**
     * 
     * @param {*} status 
     * @param {*} data 
     */
    const finalize = async (status, data = null) => {
        try{
            /**
             *  Send to client scanner console
             */
            if(data) await KafkaClient.publish(data);
        
            /**
             * Send notification to client about process status
             */
            if(status !== "system") await AWSSqsClient.queueMessage(status, data);
        
            /**
             * Release resources
             */
            await KafkaClient.disConnect();
    
        }catch(error){
            /**
             * Send to system log server
             */
            await Logger.queueLog(error, {
                projectId: process.env.PROJECT_ID, 
                uuid: process.env.UUID,
                stage: process.env.stage,
                processId: process.env.PROCESS_ID,
                version: process.env.VERSION,
                authorEmail: process.env.AUTHOR_EMAIL,
                provider: process.env.ORG_PROVIDER,
            });
        }finally{
            await exit();
        }
    }

    /**
     * Exit container
     * 
     * @param {Number} code 
     */
    const exit = async(code = 1) => {
        /**
         * Close container
         */
        setTimeout(() => {
            process.exit(code);
        }, 10);
    }

    class Kernel{

        /**
         * Start point of executing scanning process
         */
        static async bootstrap(){
            /**
             * Connect to kafka and send client startup log
             */
            await KafkaClient.connect();
            await KafkaClient.publish("==== Start Installing.... =======\n\n");

            /**
             * Create an build dir if not exists
             */
            if(!FileClient.exists(path.join(PROJECT_ROOT, 'build'))){
                FileClient.makeDir(path.join(PROJECT_ROOT, 'build'));
            }

            /**
             * Execute install command
             */
            await _installCommand.execute(`npm install 2>&1`, {
                shell: true,
                cwd: PROJECT_ROOT
            });
        }

        /**
         * Send to log server
         */
        static async queueLog(error){
            await Logger.queueLog(error, {
                projectId: process.env.PROJECT_ID, 
                uuid: process.env.UUID,
                stage: process.env.stage,
                processId: process.env.PROCESS_ID,
                version: process.env.VERSION,
                authorEmail: process.env.AUTHOR_EMAIL,
                provider: process.env.ORG_PROVIDER,
            });
        }

        /**
         * Destroy application
         * 
         * @param {String} status 
         */
        static async destroy(status){
            await finalize(status);
        }
    }

    return Kernel;
    
})(
require("./logger/Logger"),
require("./command/ShellCommand"),
require("./client/kafka/KafkaClient"),
require("./client/aws/AWSSqsClient"),
require("./client/aws/AWSS3Client")(FileClient)
);