const ValidationError = require('../error/ValidationError');
const Service = require('../service/ProjectService');


const ProjectController = {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    create: async (req, res) => {
        //check request is ajax or not
        // TODO: 
        try{
            const project = await Service.createRequest(req.body, process.env.AUTHOR_ID, process.env.AUTHOR_EMAIL);
            return res.status(200).json({status: true, statusCode: "OK", message:"Project create successfully!", project: project});
        }catch(error){
            console.log(error.message);
            if(error instanceof ValidationError){
                return res.status(400).json({status: false, statusCode:"VALIDATION_ERROR", message: error?.message, errors: error?.errors});
            }
            
            // TODO:
            // await AppLogger.queueLog(error, {
            //     userId: req.userID,
            //     params: req.params,
            //     query: req.query
            // });

            /**
             * Send log to log server
             */
            await AppLogger.queueLog(error);

            return res.status(500).json({status: false, statusCode:"INTERNAL_ERROR", message: "Opps! an internal problem detected, we fix it's soon as possible!"});
        }
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    list: async (req, res) => {
        //check request is ajax or not
        // TODO:
        try{
          const projects = await Service.listRequest(process.env.AUTHOR_ID);

          return res.status(200).json({status: true, statusCode: "OK", message:"Project fetch successfully!", projects: projects});
        }catch(error){
            console.log(error.message);
            if(error instanceof ValidationError){
                return res.status(400).json({status: false, statusCode:"VALIDATION_ERROR", message: error?.message, errors: error?.errors});
            }
            // TODO:
            // await AppLogger.queueLog(error, {
            //     userId: req.userID,
            //     params: req.params,
            //     query: req.query
            // });

            /**
             * Send log to log server
             */
            await AppLogger.queueLog(error);

            return res.status(500).json({status: false, statusCode:"INTERNAL_ERROR", message: "Opps! an internal problem detected, we fix it's soon as possible!"});
        }
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    scan: async (req, res) => {
        //check request is ajax or not
        // TODO: 
        try{
            const projectStage = await Service.scanRequest(req.body, process.env.AUTHOR_ID, process.env.AUTHOR_EMAIL);
            return res.status(200).json({status: true, statusCode: "OK", message: projectStage.message, processId: projectStage.processId});
          }catch(error){
            console.log(error.message);
            if(error instanceof ValidationError){
                return res.status(400).json({status: false, statusCode:"VALIDATION_ERROR", message: error?.message, errors: error?.errors});
            }

            // TODO:
            // await AppLogger.queueLog(error, {
            //     userId: req.userID,
            //     params: req.params,
            //     query: req.query
            // });

            /**
             * Send log to log server
             */
            await AppLogger.queueLog(error);

            return res.status(500).json({status: false, statusCode:"INTERNAL_ERROR", message: "Opps! an internal problem detected, we fix it's soon as possible!"});
          }
    },

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    deploy: async (req, res) => {
        //check request is ajax or not
        // TODO:
        try{
            const projectStage = await Service.deployRequest(req.body, process.env.AUTHOR_ID, process.env.AUTHOR_EMAIL);
            return res.status(200).json({status: true, statusCode: "OK", message: projectStage.message, processId: projectStage.processId});
        }catch(error){
            console.log(error.message);
            if(error instanceof ValidationError){
                return res.status(400).json({status: false, statusCode:"VALIDATION_ERROR", message: error?.message, errors: error?.errors});
            }
            // TODO:
            // await AppLogger.queueLog(error, {
            //     userId: req.userID,
            //     params: req.params,
            //     query: req.query
            // });

            /**
             * Send log to log server
             */
            await AppLogger.queueLog(error);

            return res.status(500).json({status: false, statusCode:"INTERNAL_ERROR", message: "Opps! an internal problem detected, we fix it's soon as possible!"});
        }
    }
}

module.exports = ProjectController;