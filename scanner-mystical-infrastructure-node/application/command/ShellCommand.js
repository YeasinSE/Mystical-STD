module.exports = (function(Shell, ShellQuote, EventEmitter){

    class ShellCommand extends EventEmitter{
        /**
         * 
         * @param {*} command 
         * @param {*} options 
         */
        async execute(command, options = {}){

            /**
             * Run command
             */
            const consoleStream = Shell.spawn(ShellQuote.quote(ShellQuote.parse(command)), options);
            
            /**
             * Send console output to client
             */
            consoleStream.stdout.on('data', (data) => {
                this.emit('onCaptureData', data.toString());
            });
            
            /**
             * Send Any std error
             */
            consoleStream.stderr.on('error', (error) => {
                this.emit('onCaptureError', error);
            });
            
            /**
             * After successfully done process
             */
            consoleStream.on('close', (code, signal) => {
                this.emit('onCaptureClose', {code, signal});
            });
        }
    }

    return ShellCommand;
})(
    require('child_process'),
    require('shell-quote'),
    require('events').EventEmitter
)