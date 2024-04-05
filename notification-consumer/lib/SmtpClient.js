const nodemailer = require("nodemailer");

class SmtpClient{

    constructor(options = {}){
        this.initConfig(options);
    }
    
    /**
     * Init smtp client by given config
     *
     * @param {*} options
     */
    initConfig (options = {}){
        console.log("==== options =====");
        console.log(options);
        /**
         * Check Option is valid or not
         */
        if(options === undefined && typeof options !== 'object'){
            throw new Error("Option should be an object!");
        }

        const smtpConfig = Object.assign({}, options);

        if(! smtpConfig.host || typeof smtpConfig.host !== "string"){
            throw new Error("Host should be an valid and required!");
        }

        if(! smtpConfig.port || typeof parseInt(smtpConfig.port) !== "number"){
            throw new Error("Port should be an valid and required!");
        }

        if(! smtpConfig.username || typeof smtpConfig.username !== "string"){
            throw new Error("User should be an valid and required!");
        }

        if(! smtpConfig.password || typeof smtpConfig.password !== "string"){
            throw new Error("Password should be an valid and required!");
        }

        this.smtpClient = nodemailer.createTransport({
            host:  smtpConfig.host,
            port: Number(smtpConfig.port),
            secure: smtpConfig.secure,
            auth: {
                user: smtpConfig.username,
                pass: smtpConfig.password
            }
        });
    }

    /**
     * Send to mail
     *
     * @param {string} from
     * @param {string} to
     * @param {string} subject
     * @param {string} body
     * @returns {string} mail id
     */
    async send(from, to, subject, body){
        if(! from || typeof from !== "string"){
            throw new Error("From should be an valid and required!");
        }

        if(! to || typeof to !== "string"){
            throw new Error("From should be an valid and required!");
        }

        if(! subject || typeof subject !== "string"){
            throw new Error("From should be an valid and required!");
        }

        if(! body || typeof body !== "string"){
            throw new Error("From should be an valid and required!");
        }

        try{
            const info = await this.smtpClient.sendMail({
                from: from,
                to: to,
                subject: subject,
                html: body
            });
            return info;
        }catch(exception){
            throw exception
        }
    }

};

module.exports = SmtpClient;