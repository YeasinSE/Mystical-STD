const { DynamoDBClient, PutItemCommand} = require("@aws-sdk/client-dynamodb");
const { v4: uuidv4 } = require('uuid');

module.exports = (function(){
    /**
     * Init database client
     */
    const dynamoDBClient = new DynamoDBClient({
        region: "us-east-1",
        credentials:{
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY
        }
    });


    class DynamoDBConnection{

        /**
         * Write log into disk
         * 
         * @param {String} log 
         */
        async insert(project){
            const {projectId, uuid, processId, stage, version, log, provider} = project;
            await dynamoDBClient.send(new PutItemCommand({
                "Item": {
                    "uuid": {
                      "S": uuidv4()
                    },
                    "projectUUID": {
                        "S": uuid
                    },
                    "projectId": {
                      "S": projectId
                    },
                    "processId": {
                        "S": processId
                    },
                    "stage": {
                      "S": stage
                    },
                    "version": {
                        "S": version
                    },
                    "provider": {
                        "S": provider
                    },
                    "log":{
                        "S": log
                    },
                    "createdAt":{
                        "S": new Date().toLocaleString()
                    }
                  },
                "ReturnConsumedCapacity": "TOTAL",
                "TableName": process.env.LOG_TABLE
            }));
        }
    }

    return DynamoDBConnection;

})();