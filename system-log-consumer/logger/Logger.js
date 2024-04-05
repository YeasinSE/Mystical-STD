module.exports = (function({createLogger, format},  DailyRotateFile){

    /**
     * Init default logger
     */
    const _defaultLogger = createLogger({
        level: 'error',
        format: format.combine(
            format.timestamp(),
            format.printf(({ timestamp, level, message }) => {
              return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
            })
        ),
        defaultMeta: { service: process.env.SERVICE_NAME},
        transports: [ 
            new DailyRotateFile({
                filename: 'logs/system-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                zippedArchive: true,
                maxSize: '10m',
                maxFiles: '3d',
            }),
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
            });
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
        
    }

    return Logger;
})(
require('winston'), 
require('winston-daily-rotate-file')
);