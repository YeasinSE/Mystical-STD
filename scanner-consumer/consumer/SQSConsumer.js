const EventEmitter = require('events').EventEmitter;
const {SQSClient} = require("@aws-sdk/client-sqs");
const {Consumer} = require('sqs-consumer');


class SQSConsumer extends EventEmitter{

        constructor(){
            super();
            
            /**
             * Create am consumer for handle AWS SQS message
             */
            this._sqsConsumer = Consumer.create({
                queueUrl: process.env.CONSUMER_QUEUE_URL,
                batchSize: 5,
                // handleMessageBatch: async (message) => {
                //     this.emit('onHandleBatchMessage', message);
                // },
                handleMessage: async (message) => {
                    this.emit('onHandleMessage', message.Body);
                },
                sqs: new SQSClient({
                    region:"us-east-1",
                    credentials:{
                        accessKeyId: process.env.ACCESS_KEY,
                        secretAccessKey: process.env.SECRET_KEY
                    }
                })
            });

            this._sqsConsumer.on('error', async (error) => {
                this.emit("onError", error);
            });
                
            this._sqsConsumer.on('processing_error',async (error) => {
                this.emit("onProcessingError", error);
            });
                
            this._sqsConsumer.on('timeout_error', async (error) => {
                this.emit("onTimeoutError", error);
            });
        }

        /**
         * Start polling from queue
         */
        async startListening(){
            this._sqsConsumer.start();
        }

        /**
         * Stop polling from queue
         */
        async stopListening(){
            this._sqsConsumer.stop();
        }

}

module.exports = SQSConsumer;
