module.exports = (function(Logger, SQSConsumer, AWSECSClient){

    /**
     * --------------- Load Application Dependency ----------------------
     */

    /**
     * Init AWS ECS client
     */
    const _ecsClient = new AWSECSClient();
    
    /**
     * Init SQS consumer
     */
    const _sqsConsumer = new SQSConsumer();


    /**
     * --------------- End Application Dependency ----------------------
     */


    /**
     * Send incoming message to queue
     * 
     * @param {String} message 
     */
    const handleMessage = async (message) => {
        console.log("=== Parse Task Message =======");
        const project = JSON.parse(message);
        console.log(project);
        try{
            await _ecsClient.executeTask(project);
        }catch(error){
            console.log("==== Error From executeTask ====");
            console.log(error);
            /**
             * Send error information to system log server
             */
            await Logger.queueLog(error, project);
        }
    }

    /**
     * Send incoming message(s) to queue
     * 
     * @param {Array} messages 
     */
    // const handleMessageBatch = async (messages) => {
    //     // code here
    // }
    
    /**
     * Handle SQS Message
     */
    _sqsConsumer.on('onHandleMessage', handleMessage);

    /**
     * Handle SQS batch messages
     */
    // _sqsConsumer.on('onHandleBatchMessage', handleMessageBatch);

    /**
     * Handle SQS Error
     */
    _sqsConsumer.on('onError', async (error) => {
        console.log("=== error===");
        await Logger.queueLog(error);
    });

    /**
     * Handle SQS processing error
     */
    _sqsConsumer.on('onProcessingError',async (error) => {
        console.log("=== processing_error===");
        await Logger.queueLog(error);
    });

    /**
     * Handle timeout error
     */
    _sqsConsumer.on('onTimeoutError', async (error) => {
        console.log("=== time out error===");
        await Logger.queueLog(error);
    });


    class Application{
        /**
         * 
         */
        static async run(){
            /**
             * Start to poll queue message
             */
            await _sqsConsumer.startListening();
        }

        /**
         * Stop polling message
         */
        static async stopListening(){
            await _sqsConsumer.stopListening();
        }

        /**
         * Write log into disk
         * 
         * @param {String} log 
         */
        static async log(log){
            await Logger.queueLog(log);
        }
    }

    return Application;

})(
require("../logger/Logger"),
require('../consumer/SQSConsumer'),
require('../client/AWSECSClient'),
);