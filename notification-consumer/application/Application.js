const EmailProcessor = require('../queue/processor/EmailProcessor');
const UpdateProjectProcessor = require("../queue/processor/UpdateProjectProcessor");


module.exports = (function(Logger, queueManager, SQSConsumer, DatabaseConnection){

    /**
     * --------------- Load Application Dependency ----------------------
     */

    /**
     * Init DB connection
     */
    const _connection = new DatabaseConnection();
    
    /**
     * Init SQS consumer
     */
    const _sqsConsumer = new SQSConsumer();

    /**
     * Init DB queue
     */
    const _projectQueue = queueManager.createQueue("project-queue");

    /**
     * Reguster DB processor
     */
    _projectQueue.registerProcessor(new UpdateProjectProcessor(Logger, _connection));

    /**
     * --------------- End Application Dependency ----------------------
     */


    /**
     * =========== Create Client queue ============
     */
    const emailQueue = queueManager.createQueue("email-queue");
    // ....


    /**
     * ============ Register job processor into queue =====
     */
    emailQueue.registerProcessor(new EmailProcessor(Logger));
    // ....


    /**
     * Send incoming message to queue
     * 
     * @param {String} message 
     */
    const handleMessage = async (message) => {
        console.log("=== Send Notification Start =======");
        console.log(message);
        try{
            const project = JSON.parse(message);
            console.log("=== project =======");
            console.log(project);

            /**
             * Send project to update project queue
             */
            await _projectQueue.queueJob([project]);
    
            switch(project.notify){
                case "email":
                    // send email to queue
                    await emailQueue.queueJob([project]);
                    break;
            }
        }catch(error){
            console.log("==== Notification Error====");
            console.log(error);
            await Logger.queueLog(error);
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
             * Connect to db server
             */
            await this.connect(); 
            
            /**
             * Start to poll queue message
             */
            await _sqsConsumer.startListening();
        }

        /**
         * Connect to mongo db server
         */
        static async connect(){
            /**
             * Connect to db server
             */
            await _connection.connect(); 
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
require("../queue/QueueManager"),
require('../consumer/SQSConsumer'),
require('../database/DatabaseConnection')
);