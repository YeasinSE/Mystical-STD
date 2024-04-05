const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');

module.exports = (function(){
    
    /**
     * Connect aws SQS.
     */
    const s3Client = new S3Client({
        region:"us-east-1",
        credentials:{
            accessKeyId: process.env.ACCESS_KEY,
            secretAccessKey: process.env.SECRET_KEY
        }
    });


    class AWSS3Client{
         /**
         * Publish log data to kafka
         */
        static async upload(uploadData){
            await s3Client.send(new PutObjectCommand({
                Bucket: uploadData.bucket,
                Key: uploadData.key,
                Body: FileClient.createReadStream(uploadData.filePath),
                ContentType: FileClient.getMimeType(uploadData.filePath)
            }));
        };
    }

    return AWSS3Client;
});