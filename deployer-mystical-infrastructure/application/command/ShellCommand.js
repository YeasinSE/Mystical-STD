const EventEmitter = require('events').EventEmitter;

module.exports = (function(Shell){

    class ShellCommand extends EventEmitter{
      
        /**
         * 
         * @param {*} command 
         * @param {*} options 
         */
        async execute(command, options = {}){
            console.log('Run: ' + command);
            /**
             * Execute shell
             */
            const consoleStream = Shell.spawn(command, options);
            
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
    require('child_process')
)