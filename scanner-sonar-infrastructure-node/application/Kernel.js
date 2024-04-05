require('dotenv').config();
require('./lib/FileClient');

const path = require('path');

/**
 * Kernel is a central part of the app that Handles scanning process on terminal command.
 * 
 * @param {Object} Logger
 * @param {Object} KafkaClient 
 * @param {Object} AWSSqsClient
 * @param {Object} ShellCommand
 * 
 */
module.exports = (function(Logger, KafkaClient, AWSSqsClient, ShellCommand){
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
            await KafkaClient.publish(`===== Analysis finished. =====\n\nsee result at: ${process.env.ORG_HOST}/dashboard?id=${process.env.ORG_PROJECT_KEY}`);

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
    
    /**
     * Application bootstarp class
     */
    class Kernel{
        /**
         * 
         */
        static async bootstrap(){
            /**
             * Connect to kafka
             */
            await KafkaClient.connect();
            await KafkaClient.publish("==== Starting analysis.... =======\n\n");
            
            /**
             * Execute command
             */
            await _shellCommand
            .execute(`sonar-scanner -Dsonar.organization=${process.env.ORG_NAME} -Dsonar.projectKey=${process.env.ORG_PROJECT_KEY} -Dsonar.sources=.  -Dsonar.host.url=${process.env.ORG_HOST} -Dsonar.token=${process.env.ACCESS_TOKEN}`, {
                shell: true,
                cwd: path.join(process.cwd(), 'output')
            });
        }

        /**
         * Send log information to system log server
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
require("./client/kafka/KafkaClient"),
require("./client/aws/AWSSqsClient"),
require("./command/ShellCommand")
);