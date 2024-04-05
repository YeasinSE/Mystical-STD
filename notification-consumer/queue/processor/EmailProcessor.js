const SmtpClient = require('../../lib/SmtpClient');
const EmailTemplate = require('../../template/email/EmailTemplate');
const { Worker } = require('bullmq');


class EmailProcessor{

    constructor(Logger){

        this.Logger = Logger;

        /**
         * Init email client
         */
        this.smtpClient = new SmtpClient({
            host:  process.env.SMTP_MAIL_HOST,
            port: Number(process.env.SMTP_MAIL_PORT),
            secure: false,
            username: process.env.SMTP_MAIL_USERNAME, 
            password: process.env.SMTP_MAIL_PASSWORD
        });
    }

    /**
     * 
     * @param {*} queue 
     * @param {*} config 
     */
    create(queueName, connection, config = {}){
        console.log("===== create email processor =====");
        console.log(queueName);
        console.log(config);

        this.processor = new Worker(queueName, async (job) =>  {
            console.log("=== handle email processor =====");
            console.log(job.data);
            const data = Array.isArray(job.data) ? job.data : [job.data];
            const info = await Promise.allSettled(data.map((item) => this.buildJob(item)));
            console.log(info);
        },  {connection});

        this.processor.on('completed', async (job) => {
            console.log(`Email Job completed at ${job.id}`);
        });
        
        this.processor.on('failed', async (job) => {
            console.log(`Email Job failed at ${job.id}`);
            // send log
            await this.Logger.queueLog(error, job);
        });
    }

    async buildJob(item){
        console.log(item);
        try{
            const deployUrl = item.stage === "deploy" && item.status === "done" ? `Url: http://${item.projectId}.${process.env.DOMAIN_NAME}:5003` : null;
            console.log(deployUrl);
            const template = await EmailTemplate.build(`Your project: ${item.projectId} stage: ${item.stage} version: v${item?.version} status: ${item.status} ${deployUrl || ""}`,  `Project ${item.stage} report`, process.env.APP_NAME);
            return this.smtpClient.send(process.env.FROM_EMAIL, item.authorEmail, `Project ${item.stage} Report`, template);
        }catch(error){
            // send log
            console.log("=== error froom email processor ====")
            console.log(error);
            await this.Logger.queueLog(error, item);
        }
    }
}

module.exports = EmailProcessor;