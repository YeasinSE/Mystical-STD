const EventEmitter = require('events').EventEmitter;
const httpProxy = require('http-proxy');

module.exports = (function(Logger){

    /**
     * --------------- Load Application Dependency ----------------------
     */

    /**
     * Defined root path 
     */
    const APP_BICKET = process.env.HOST_ROOT_PATH;

    /**
     * Init proxy
     */
    const _proxy = httpProxy.createProxy();

    /**
     * --------------- End Application Dependency ----------------------
     */


    _proxy.on('proxyReq', (proxyReq, req, res) => {
        const url = req.url;
        console.log(url);
        if(url === '/'){
            proxyReq.path += 'index.html';     
        }
    });


    class Application extends EventEmitter{
        /**
         * 
         */
        static async run(){
            /**
             * Connect to db server
             */
            await this.connect(); 
        }

        /**
         * Handle incoming request and resolve to actual server
         * 
         * @param {Object} req 
         * @param {Object} res 
         * @returns 
         */
        static async handleRequest(req, res){
            try{
                const subDomain = req.hostname.split('.')[0];
                const version = req.hostname.split('.')[1];
 
                return _proxy.web(req, res, {target: `${APP_BICKET}/${subDomain}-v${version}`, changeOrigin: true} );
            }catch(error){
                await Logger.queueLog(error);
                return res.redirect(`/error.html?message=${error.message}`);
            }
        }

        /**
         * Connect to mongo db server
         */
        static async connect(){
            /**
             * Connect to db server
             */
            
        }

        /**
         * Write log into disk
         * 
         * @param {String} log 
         */
        static async log(log){
            await Logger.queueLog(log);
        }
    }

    return Application;

})(
require("../logger/Logger")
);