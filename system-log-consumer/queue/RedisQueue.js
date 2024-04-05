const Redis = require('ioredis')
const EventEmitter = require('events').EventEmitter;

module.exports = (function(){

    /**
     * Init redis connection
     */
    const _subscriber = new Redis(process.env.REDIS_URL);

    class RedisQueue extends EventEmitter{

        async startListening(){
            /**
             * Subscribe to publisher
             */
            _subscriber
            .psubscribe(`${process.env.SYSTEM_LOG_CONTAINER}:*`, (err, count) => {
                if(err){
                    this.emit("onError", err);
                }
                console.log("count", count);
            });

            /**
             * Process queue message
             */
            _subscriber
            .on("pmessage", async (pattern, channel, message) => {
                console.log(channel, message);
                this.emit("onPublish", {channel, message});
            });
        }
    }

    return RedisQueue;
})();