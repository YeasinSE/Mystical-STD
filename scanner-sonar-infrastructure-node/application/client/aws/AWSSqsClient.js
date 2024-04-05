const {SQSClient, SendMessageCommand} = require('@aws-sdk/client-sqs');

module.exports = (function(){
    
    /**
     * Connect aws SQS.
     */
    const sqsClient = new SQSClient({
        region:"us-east-1",
        credentials:{
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY
        }
    });


    class AWSSqsClient{
         /**
         * Publish log data to kafka
         */
        static async queueMessage(status){
            await sqsClient.send(new SendMessageCommand({
                // Remove DelaySeconds parameter and value for FIFO queues
                DelaySeconds: 10,
                MessageAttributes: {
                    Title: {
                        DataType: "String",
                        StringValue: process.env.PROJECT_ID,
                    },
                    Author: {
                        DataType: "String",
                        StringValue: process.env.AUTHOR_ID,
                    },
                    Status: {
                        DataType: "String",
                        StringValue: status,
                    },
                },
                MessageBody: JSON.stringify({ 
                    projectId: process.env.PROJECT_ID, 
                    uuid: process.env.UUID, 
                    processId: process.env.PROCESS_ID, 
                    authorEmail: process.env.AUTHOR_EMAIL,
                    notify: process.env.NOTIFY,
                    version: process.env.VERSION, 
                    provider: process.env.ORG_PROVIDER, 
                    stage: "scan", 
                    status: status
                }),
                QueueUrl: process.env.NOTIFICATION_QUEUE_URL,
            }));
        };
    }

    return AWSSqsClient;
})();