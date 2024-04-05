const path = require('path');
const fs = require('fs');
const { EventEmitter } = require('events').EventEmitter;


module.exports = (function({Kafka}){
    /**
     * Init kafka server
     */
    const _kalfkaClient = new Kafka({
        clientId: process.env.KAFKA_CLIENT_ID,
        brokers:[process.env.KAFKA_BROKERS],
        // brokers:[process.env.KAFKA_BROKERS?.split(",")],
        ssl:{
            ca:[fs.readFileSync(path.join(`${__dirname}/../`, 'ca.pem'), 'utf-8')]
        },
        sasl:{
            username: process.env.KAFKA_USER,
            password: process.env.KAFKA_PASSWORD,
            mechanism:"plain"
        }
    });

    /**
     * Create consumer
     */
    const _consumer = _kalfkaClient.consumer({groupId: process.env.KAFKA_GROUP_ID});



    class KafkaConsumer extends EventEmitter{

        /**
         * Connect kafka consumer
         */
        async connect(){
            await _consumer.connect();
        }

        /**
         * 
         * @param {String} topic 
         */
        async startListening(topic){

            /**
             * Subscribe topic
             */
            await _consumer.subscribe({ topic: topic });

            /**
             * Run consumer task
             */
            await _consumer.run({
                autoCommit: false,
                eachBatchAutoResolve: true,
                eachBatch: async ({ batch, resolveOffset, heartbeat, commitOffsetsIfNecessary, isRunning, isStale }) => {
                    for (let message of batch.messages) {
                        if (!isRunning() || isStale()) break
                        this.emit("onEachBatchMessage", message);
                        resolveOffset(message.offset);
                        await commitOffsetsIfNecessary(message.offset);
                        await heartbeat();
                    }
                }
            })
        }

        /**
         * DisConnect kafka consumer
         */
        async disConnect(){
            await _consumer.disconnect();
        }

    }

    return KafkaConsumer;
    
})(require('kafkajs'));