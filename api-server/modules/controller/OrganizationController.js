const ValidationError = require('../error/ValidationError');
const Service = require('../service/OrganizationService');


const OrganizationController = {

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
            const organization = await Service.createRequest(req.body, process.env.AUTHOR_ID);
            return res.status(200).json({status: true, statusCode: "OK", message:"Organization create successfully!", organization});
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
    createProject: async (req, res) => {
        //check request is ajax or not
        // TODO:
        try{
            const organizationProject = await Service.createProjectRequest(req.body, process.env.AUTHOR_ID, process.env.AUTHOR_EMAIL);
            return res.status(200).json({status: true, statusCode: "OK", message:"Project create successfully in Organization!", organizationProject});
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
    getAllOrganization: async (req, res) => {
        //check request is ajax or not
        // TODO:
        try{
          const organizations = await Service.getOrganizationRequest(process.env.AUTHOR_ID);
          return res.status(200).json({status: true, statusCode: "OK", message:"Organization fetch successfully!", organizations});
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
    listOrganization: async (req, res) => {
        //check request is ajax or not
        // TODO:
        try{
          const organizations = await Service.listOrganizationInProviderRequest(req.params, process.env.AUTHOR_ID);
          return res.status(200).json({status: true, statusCode: "OK", message: "Organization fetch successfully!", organizations});
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
    listOrganizationProject: async (req, res) => {
        //check request is ajax or not
        // TODO:
        try{
          const organizationProjects = await Service.listOrganizationProjectRequest(req.params, process.env.AUTHOR_ID);
          return res.status(200).json({status: true, statusCode: "OK", message: "Organization fetch successfully!", organizationProjects});
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

module.exports = OrganizationController;