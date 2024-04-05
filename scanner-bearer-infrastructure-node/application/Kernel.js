require('dotenv').config();
require("./lib/FileClient");

const path = require('path');


/**
 * Kernel is a central part of the app that Handles scanning process on terminal command.
 * 
 * @param {Object} Logger
 * @param {Object} KafkaClient 
 * @param {Object} AWSQSClient
 * @param {Object} ShellCommand
 */
module.exports = (function(Logger, ShellCommand, KafkaClient, AWSSqsClient){
    /**
     * Init shell for executing command
     */
    const _shellCommand = new ShellCommand();

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
     * Capture console output
     */
    _shellCommand
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
    _shellCommand
    .on('onCaptureError', async (error) => {
        await onHandleError(error);
    });

    /**
     * Handle suuccessfully process command
     */
    _shellCommand
    .on('onCaptureClose', async () => {
        try{
            /**
             * Publish to kafka
             */
            await KafkaClient.publish(`===== Analysis finished. =====\n\n`);
        
            /**
             * Destroy after all process done
             */
            await finalize("done", `see result at: ${process.env.ORG_HOST}/dashboard?id=${process.env.ORG_PROJECT_KEY}`);

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
            console.log(data);
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
            await KafkaClient.publish("==== Starting analysis.... =======\n\n");

            /**
             * Execute command
             */
            await _shellCommand
            .execute(`bearer scan . --debug --scanner=${process.env.BEARER_SCANNER} --severity=${process.env.BEARER_SEVERITY} --report=${process.env.BEARER_REPORT} --format=${process.env.BEARER_FORMAT} --api-key=${process.env.ACCESS_TOKEN}`, {
                shell: true,
                cwd: path.join(process.cwd(), 'output')
            });
        }

        /**
         * Send to system log server
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
require("./client/aws/AWSSqsClient")
);