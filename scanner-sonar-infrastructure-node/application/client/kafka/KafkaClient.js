const path = require('path');


module.exports = (function({Kafka, Partitioners}){
    
    /**
     * Connect kafka log server
     */
    const _kalfkaClient = new Kafka({
        clientId: `scan-${process.env.ORG_PROJECT_KEY}-V${process.env.VERSION}`,
        brokers:[process.env.KAFKA_BROKERS],
        // brokers:[process.env.KAFKA_BROKERS?.split(",")],
        ssl:{
            ca:[FileClient.readFileSync(path.join(`${__dirname}/../../../`, 'ca.pem'), 'utf-8')]
        },
        sasl:{
            username: process.env.KAFKA_USER,
            password: process.env.KAFKA_PASSWORD,
            mechanism:"plain"
        }
    });

    /**
     * Create producer
     */
    const _producer = _kalfkaClient.producer({createPartitioner: Partitioners.DefaultPartitioner});


    class KafkaClient{

        /**
         * Connect kafka procedure
         */
        static async connect(){
            await _producer.connect();
        }

         /**
         * Publish log data to kafka
         */
        static async publish(log){
            await _producer.send({
                topic: process.env.KAFKA_TOPIC,
                messages: [
                    { 
                        key: `scan-V${process.env.VERSION}`, 
                        value: JSON.stringify({
                            projectId: process.env.PROJECT_ID, 
                            uuid: process.env.UUID, 
                            provider: process.env.ORG_PROVIDER, 
                            processId: process.env.PROCESS_ID, 
                            stage: "scan", 
                            version: process.env.VERSION, 
                            log: `>> ${log}` 
                        })
                    },
                ]
            })
        };

        /**
         * DisConnect kafka procedure
         */
        static async disConnect(){
            await _producer.disconnect();
        }

    }

    return KafkaClient;
    
})(require('kafkajs'));