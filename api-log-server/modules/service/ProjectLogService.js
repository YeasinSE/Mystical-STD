
const ValidationError = require("../error/ValidationError");
const DynamoDBSearcher = require("../searcher/aws/DynamoDBSearcher");
const Validator = require("../validator/validator");

class ProjectLogService{

    /**
     * 
     * @param {*} params 
     * @param {*} authId 
     * @returns 
     */
    static async searchRequest(params, query){

        const {projectId,  processId} = params;

        if(!projectId) {
            throw new ValidationError("project id is required!");
        }

        if(!Validator.isValidUUID4(projectId)){
            throw new ValidationError("Invalid project id!");
        }

        if(!processId) {
            throw new ValidationError("process id is required!");
        }

        if(!Validator.isValidUUID4(processId)){
            throw new ValidationError("Invalid process id!");
        }

        const {stage, version} = query;

        if(!stage || !version){
            throw new ValidationError("Stage and version both are required!");
        }

        if(!Validator.isAlpa(stage)){
            throw new ValidationError("Stage should be an string!");
        }

        if(!Validator.isDigit(version)){
            throw new ValidationError("Version should be an digit!");
        }

        // check project exists in projectstages like (deploy, scan and test mode etcs) 
        // TODO:

        /**
         * Search logs
         */
        return await DynamoDBSearcher.searchLog(projectId, processId, stage, version);
    }

}

module.exports = ProjectLogService;