const {DynamoDBClient, ScanCommand, } = require("@aws-sdk/client-dynamodb");

const DynamoDBSearcher = (function(){

    /**
     * Connect aws DynamoDB
     */
    const dynamoDBClient = new DynamoDBClient({
        region: "us-east-1",
        credentials:{
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY
        }
    });

    /**
     * 
     * @param {*} projectId 
     * @param {*} processId 
     * @param {*} stage 
     * @param {*} version 
     * @returns 
     */
    const search = async (projectId, processId, stage, version) => {
        const response = await dynamoDBClient.send(new ScanCommand({
            ExpressionAttributeNames: {
                "#PRJ": "projectId",
                "#PRC": "processId",
                "#DS": "stage",
                "#DL": "log",
                "#DV": "version",
                "#CA": "createdAt",
            },
            ExpressionAttributeValues: {
                ":prj": {
                  "S": projectId
                },
                ":prc": {
                    "S": processId
                },
                ":st": {
                    "S": stage
                },
                ":vs": {
                    "S": version
                }
            },
            FilterExpression: "projectUUID = :prj and processId = :prc and stage = :st and version = :vs",
            ProjectionExpression: "#PRJ, #PRC, #DS, #DL, #DV, #CA",
            TableName: process.env.APP_LOG_TABLE
        }));
        return response?.Items;
    }

    /**
     * Public method
     */
    return{
        searchLog: search
    }
})();

module.exports = DynamoDBSearcher;