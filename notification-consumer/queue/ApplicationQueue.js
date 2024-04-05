const Redis = require('ioredis');
const { Queue } = require('bullmq');
const defaultConfig = require(__dirname + '/../config/queue.json');

module.exports = (name, config = {}) => {

    class ApplicationQueue{

        constructor(){
            this.queue = new Queue(name, {
                connection: new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null}),
                ...{...defaultConfig, ...config}
            });
        }
        
        async queueJob(data, options = {}){
            this.queue.add(this.queue.name, data, options);
        }

        registerProcessor(processor, config = {}){
            if(!processor) throw new Error(`Processor reuired for this queue: ${name}`);
            
            processor.create(this.queue.name, new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: null}), config);
        }
        
    }
    
    return new ApplicationQueue();
}