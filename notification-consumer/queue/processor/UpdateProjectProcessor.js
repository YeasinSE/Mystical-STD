const { Worker } = require('bullmq');


class UpdateProjectProcessor{

    constructor(Logger, DatabaseConnection){
        this.Logger = Logger;
        this.connection = DatabaseConnection;
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

    async buildJob(project){
        console.log(project);
        try{
            // update project stage table
            await this.connection.updateProjectStage(project);
        }catch(error){
            // send log
            console.log("=== error froom update project processor ====")
            console.log(error);
            await this.Logger.queueLog(error, project);
        }
    }
}

module.exports = UpdateProjectProcessor;