module.exports = (function(Redis){

    /**
     * Init redis connection
     */
    const _connection = new Redis(process.env.REDIS_URL);

    class Logger{

        /**
         * 
         * @param {*} log 
         * @param {*} stack 
         * @returns 
         */
        static async buildLogMessage(log, stack = null){
            const context = (await import('stack-trace')).parse(log)?.[0];
            return JSON.stringify({
                server: "sonar-infrasturue",
                domain: "aws-ecs",
                port: "0000",
                fileName: context.getFileName(), 
                lineNumber: context.getLineNumber(),
                methodName: context?.getFunctionName() || context?.getFunction(),
                message: log?.message,
                stack: log?.stack || {},
                details: stack
            })
        }

        /**
         * 
         * @param {*} log 
         */
        static async queueLog(log, stack = null){
            console.log("===== queue log ======");
            console.log(log?.message);
            try{
                if(! _connection) throw new Error(`Redis connection reuired for queue log`);
                const logMessage = await this.buildLogMessage(log, stack);
                console.log(logMessage);
                await _connection.publish(`${process.env.SYSTEM_LOG_CONTAINER}:${process.env.SERVICE_NAME}`, logMessage);
                console.log(`Success to: ${process.env.SYSTEM_LOG_CONTAINER}:${process.env.SERVICE_NAME}`);
}           catch(error){
                console.log("==== loger error ======");
                console.log(error);
            }
        }
    }

    return Logger;

})(require('ioredis'));