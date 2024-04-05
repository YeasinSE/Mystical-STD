module.exports = (function({MongoClient} ){
    /**
     * Init database client
     */
    const _client = new MongoClient(process.env.MOGO_URL);


    class DatabaseConnection{

        /**
         * Connect to mongo db server
         */
        async connect(){

            /**
             * Connect to mongo server
             */
            await _client.connect();

            // Send a ping to confirm a successful connection
            await _client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
            
        }

        /**
         * DisConnect to mongo db server
         */
        async disConnect(){
            await _client.close();
        }

        /**
         * Write log into disk
         * 
         * @param {String} log 
         */
        async insert(channel, logRow){
            return await _client.db(process.env.MONGO_DB).collection(process.env.MONGO_LOG_TABLE).insertOne({...logRow, ...{channel, createdAt: new Date().toLocaleString()}});
        }
    }

    return DatabaseConnection;

})(require('mongodb'));