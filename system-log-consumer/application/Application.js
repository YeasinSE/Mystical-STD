module.exports = (function(Logger, RedisQueue, DatabaseConnection){

    /**
     * Init Database Client
     */
    const _connection = new DatabaseConnection();

    /**
     * Init Redis Client
     */
    const _redisQueue = new RedisQueue();

    /**
     * Subscribe to publisher
     */
     _redisQueue
     .on('onPublish', async (data) => {
         try{
             const result = await _connection.insert(data.channel, JSON.parse(data.message));
             console.log(`New log created with the following id: ${result.insertedId}`);
         }catch(error){
            console.log(error);
            await Logger.writeLog(error);
         }
     });

     /**
      * Subscribe to Error
      */
     _redisQueue
     .on('onError', async (error) => await Logger.writeLog(error));


    class Application{
        /**
         * 
         */
        static async run(){
            /**
             * Connect to mongo db server
             */
            await this.connect(); 
      
           /**
            * Start to poll queue message
            */
           await _redisQueue.startListening();
        }

        /**
         * Connect to mongo db server
         */
        static async connect(){
            try{
                 /**
                  * Connect to mongo db server
                  */
                 await _connection.connect(); 
            }catch(error){
                console.log(error);
                await this.log(error);
            }
         }

        /**
         * Connect to mongo db server
         */
         static async disConnect(){
            try{
                 await _connection.disConnect();
            }catch(error){
                 await this.log(error);
            }
         }

        /**
         * Write log into disk
         * 
         * @param {String} log 
         */
        static async log(log){
            await Logger.writeLog(log);
        }
    }

    return Application;

})(
require("../logger/Logger"),
require('../queue/RedisQueue'),
require('../database/DatabaseConnection')
);