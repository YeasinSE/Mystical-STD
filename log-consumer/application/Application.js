/**
 * 
 */
module.exports = (function(Logger, KafkaConsumer, DynamoDBConnection){
    /**
     * --------------- Load Application Dependency ----------------------
     */

    /**
     * Init AWS dynamo DB
     */
    const _dynamoDBConnection = new DynamoDBConnection();

    /**
     * Init Kafka consumer
     */
    const _kafkaConsumer = new KafkaConsumer();

  
    /**
     * --------------- End Application Dependency ----------------------
     */


    /**
     * Handle Polling Message
     */
    _kafkaConsumer
    .on('onEachBatchMessage', async (message) => {
        const project = JSON.parse(message.value?.toString() || {});
        try{
            await _dynamoDBConnection.insert(project);
        }catch(error){
            /**
             * Send to system logs
             */
            await Logger.queueLog(error, project);
        }
    });


    class Application{
        /**
         * 
         */
        static async run(){

            /**
             * Connect to consumer
             */
            await _kafkaConsumer.connect();

            /**
             * Start to poll queue message
             */
            await _kafkaConsumer.startListening(process.env.KAFKA_TOPIC);
        }

        /**
         * Destroy resources
         */
        static async destroy(){
            /**
             * Disconnect kafka server
             */
            await _kafkaConsumer.disConnect();
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
require('../consumer/KafkaConsumer'),
require('../databases/DynamoDBConnection'),
);