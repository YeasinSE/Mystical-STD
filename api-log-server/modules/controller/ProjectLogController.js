const ValidationError = require('../error/ValidationError');
const LogService = require('../service/ProjectLogService');


const ProjectLogController = {

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    search: async (req, res) => {
        //check request is ajax or not
        // TODO:
        try{
          const logs = await LogService.searchRequest(req.params, req.query);
          return res.status(200).json({status: true, logs});
        }catch(error){
            console.log(error);
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
             * Send to system log server
             */
            await AppLogger.queueLog(error);

            return res.status(500).json({status: false, statusCode:"INTERNAL_ERROR", message: "Opps! an internal problem detected. We fix it's soon as possible!"});
        }
    }
}

module.exports = ProjectLogController;