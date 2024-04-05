const Redis = require('ioredis');
const winston = require('winston');
const DailyRotateFile = require('winston-daily-rotate-file');

globalThis.AppLogger = (function(){

    /**
     * Init redis connection
     */
    const _connection = new Redis(process.env.REDIS_URL);

    /**
     * Init default application logger
     */
    const _defaultLogger = winston.createLogger({
        level: 'error',
        format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.printf(({ timestamp, level, message }) => {
              return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
            })
        ),
        defaultMeta: { service: process.env.SERVICE_NAME},
        transports: [ 
            new DailyRotateFile({
                filename: 'logs/error-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '7d',
            })
        ]
    });

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
                server: process.env.SERVICE_NAME,
                domain: process.env.DOMAIN_NAME,
                port: process.PORT,
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
         * @param {*} type 
         */
        static async writeLog(log, stack = null, type = "error"){
            _defaultLogger.log({
                level: type || "error",
                message: await this.buildLogMessage(log, stack)
            });
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
                console.log(logMessage)
;               await _connection.publish(`${process.env.SYSTEM_LOG_CONTAINER}:${Math.random()}`, logMessage);
            }catch(error){
                console.log(error);
                await this.writeLog(error, stack);
            }
        }
    }

    return Logger;
})();