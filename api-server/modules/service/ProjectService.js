const Validator = require("../validator/validator");
const Search = require("../searcher/ProjectSearcher");
const {SQSClient, SendMessageCommand} = require('@aws-sdk/client-sqs');
const {Project, ProjectStage, sequelize} = require('../../models');

const projectStage = require('../constant/projectStage');
const projectStatus = require('../constant/projectStatus');
const ValidationError = require("../error/ValidationError");

/**
 * Connect aws SQS. should be an iam admin user credentials
 */
const awsClient = new SQSClient({
    region:"us-east-1",
    credentials:{
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_KEY
    }
});

class ProjectService{

    /**
     * 
     * @param {*} requestData 
     * @param {*} authId 
     * @returns 
     */
    static async createRequest(requestData, authorId, authorEmail){

        const {projectUrl, projectKey: projectId, domain, projectType} = requestData;
      
        if(Validator.isEmpty(projectUrl)) throw new ValidationError("Project url is required!");
        if(!Validator.isValidURL(projectUrl)) throw new ValidationError("Project url is invalid!");

        if(Validator.isEmpty(projectType)) throw new ValidationError("Project type is required");
        if(!Validator.isAlpa(projectType)) throw new ValidationError("Project type only alpha permitted");
    
        if(Validator.isEmpty(projectId) || projectId?.length > 20) throw new ValidationError("Project key is required and max 20 charecter");
        if(!Validator.isAlpaNumber(projectId)) throw new ValidationError("Project key is only permitted alpa and number");
        
        console.log(projectUrl, projectId);
      
        // create an project with uuid, projectType, authorId, key, url, domain, custom_domain, createdAt, updatedAt, deletedAt
        return await Project.create({projectType:projectType, authorId:authorId, key:projectId, url:projectUrl, domain:domain});
    }

    /**
     * 
     * @param {*} params 
     * @returns 
     */
    static async listRequest(authorId){
        /**
         * Sanitize and validate incomming request data
         */
        if(Validator.isEmpty(authorId)) throw new ValidationError("Author is required");
        
        // if(Validator.isInvalidContain(authorId)) throw new ValidationError("Author is required");
 
        return await Project.findAll({where:{authorId}});
    }

    /**
     * 
     * @param {*} params 
     * @param {*} authId 
     * @returns 
     */
    static async scanRequest(requestData, authorId, authorEmail){
        const {projectUUID} = requestData;
        console.log(requestData);
      
        /**
         * validate incomming request data
         */
        if(Validator.isEmpty(projectUUID)) {
            throw new ValidationError("project url is required!");
        }

        if(!Validator.isValidUUID4(projectUUID)){
            throw new ValidationError("Invalid project id!");
        }

        // let scanProjectInOrganization = null;

        const {organizationID, organizationProjectID} = requestData;

        if(!Validator.isValidUUID4(organizationProjectID)){
            throw new ValidationError("Invalid organization Project id!");
        }

        if(!Validator.isValidUUID4(organizationID)){
            throw new ValidationError("Invalid organization id!");
        }
  
        /**
         * Should be check project exists Or not
         */
        const project = await Search.getProjectWhere({uuid: projectUUID});
        console.log(project);
        if(!project){
            throw new ValidationError("Project not available. please create an project!");
        }

        const scanProjectInOrganization = (await Search.getOrganizationProject(organizationID, organizationProjectID, authorId))?.[0];
        console.log(scanProjectInOrganization);

        /**
         * Should be check project already processing in scan stage
         */
        let projectInScanStage = await Search.getProjectStageWhere({authorId: authorId, organizationUUID: organizationID, orgProjectUUID: organizationProjectID, projectUUID:projectUUID, stage: projectStage.SCAN, version: Number(project.scanVersion) > 0 ? Number(project.scanVersion) : 1});
        console.log(projectInScanStage);
        if(projectInScanStage){
            if(projectInScanStage.status === projectStatus.PROCESSING){
                throw new ValidationError(`Project scan version v-${project.scanVersion} already processing!`)
            }
        }

        const nextVersion = Number(project.scanVersion) > 0 ? (project.scanVersion + 1) : 1;
        console.log(nextVersion);

        console.log(`Create new scan version: v-${nextVersion} in projectStage: ${projectUUID}`);
        projectInScanStage = await ProjectStage.create({authorId: authorId, organizationUUID: organizationID, organizationName: scanProjectInOrganization.provider, orgProjectUUID: organizationProjectID, projectUUID: projectUUID, stage: projectStage.SCAN, status: projectStatus.PROCESSING, version: nextVersion});

        console.log(`Update version: v-${nextVersion} in project: ${projectUUID}`);
        await project.update({scanVersion: nextVersion}, {where:{projectUUID: projectUUID}});

        await awsClient.send(new SendMessageCommand({
            DelaySeconds: 10,
            MessageAttributes: {
                Title: {
                    DataType: "String",
                    StringValue: `Project scan v${nextVersion}`,
                },
                Author: {
                    DataType: "String",
                    StringValue: authorId,
                },
                Status: {
                    DataType: "String",
                    StringValue: "pending",
                },
            },
            MessageBody: JSON.stringify({ 
                projectUrl: project.url, 
                projectId: project.key, 
                projectUUID: projectUUID, 
                processId: projectInScanStage.uuid, 
                authorId: project.authorId, 
                authorEmail: authorEmail,
                notify: "email",
                version: nextVersion,
                provider: scanProjectInOrganization?.provider,
                name: scanProjectInOrganization?.name,
                projectKey: scanProjectInOrganization?.projectKey,
                accessToken: scanProjectInOrganization?.accessToken,
                hostUrl: scanProjectInOrganization?.hostUrl,
                status: projectStatus.PROCESSING
            }),
            QueueUrl: process.env.SCANNER_SQS_QUEUE_URL,
        }));
        
        return {message: `Project queued for scanning version v-${nextVersion}. you get notification when scanning done!`, processId: projectInScanStage.uuid};
    }

    /**
     * 
     * @param {*} params 
     * @param {*} authId 
     * @returns 
     */
    static async deployRequest(requestData, authorId, authorEmail){
        const {projectUUID} = requestData;

        /**
         * validate incomming request data
         */
        if(Validator.isEmpty(projectUUID)) {
            throw new ValidationError("project url is required!");
        }

        if(!Validator.isValidUUID4(projectUUID)){
           throw new ValidationError("Invalid project id!");
        }

        /**
         * Should be check project exists Or not
         */
        const project = await Search.getProjectWhere({uuid: projectUUID});
        console.log(project);
        if(!project){
            throw new ValidationError("Project not available. please create an project!");
        }

        /**
         * TODO: fixed organizatioPprojectUUID in deploy stage
         */
        const {organizationID, organizationProjectID} = requestData;

        if(!Validator.isValidUUID4(organizationProjectID)){
            throw new ValidationError("Invalid organization Project id!");
        }

        if(!Validator.isValidUUID4(organizationID)){
            throw ValidationError("Invalid organization id!");
        }

        /**
         * Get organization deploy configuration
         */
        const deployProjectInOrganization = (await Search.getOrganizationProject(organizationID, organizationProjectID, authorId))?.[0];
        console.log(deployProjectInOrganization)

        /**
         * Should be check project already processing in scan stage
         */
        let projectInDeployStage = await Search.getProjectStageWhere({authorId: authorId, organizationUUID: organizationID, orgProjectUUID: organizationProjectID, projectUUID:projectUUID, stage: projectStage.DEPLOY, version: Number(project.scanVersion) > 0 ? Number(project.scanVersion) : 1});
        console.log(projectInDeployStage);
        if(projectInDeployStage){
            if(projectInDeployStage.status === projectStatus.PROCESSING){
               throw new ValidationError(`Project deploy version v-${project.deployVersion} already processing!`);
            }
        }

        const nextVersion = Number(project.deployVersion) > 0 ? (project.deployVersion + 1) : 1;
        

        projectInDeployStage = await ProjectStage.create({authorId: authorId, organizationUUID: organizationID, organizationName: deployProjectInOrganization.provider, projectUUID: projectUUID, stage: projectStage.DEPLOY, status: projectStatus.PROCESSING, version: nextVersion});
        console.log(projectInDeployStage);
        console.log(`Update version: v-${nextVersion} in project: ${projectUUID}`);
        
        await project.update({deployVersion: nextVersion}, {where:{projectUUID: projectUUID}});

        await awsClient.send(new SendMessageCommand({
            // Remove DelaySeconds parameter and value for FIFO queues
            DelaySeconds: 10,
            MessageAttributes: {
                Title: {
                    DataType: "String",
                    StringValue: `Project deploy v${nextVersion}`,
                },
                Author: {
                    DataType: "String",
                    StringValue: authorId,
                },
                Status: {
                    DataType: "String",
                    StringValue: "pending",
                },
            },
            MessageBody: JSON.stringify({ 
                projectUrl: project.url,
                processId: projectInDeployStage.uuid,
                projectId: project.key,
                projectUUID: projectUUID,
                authorId: authorId,
                authorEmail: authorEmail,
                notify: "email",
                version: nextVersion,
                status: projectStatus.PROCESSING,
                provider: deployProjectInOrganization.provider,
                hostUrl: deployProjectInOrganization?.hostUrl,
            }),
            QueueUrl: process.env.DEPLOYER_SQS_QUEUE_URL,
        }));
        
        return { message: `Project queued for deploy version v-${nextVersion}. you get notification when deploy done!`, processId: projectInDeployStage.uuid};
    }
}

module.exports = ProjectService;