const Validator = require("../validator/validator");
const Search = require("../searcher/OrganizationSearcher");

const {Organization, OrganizationProject, sequelize} = require('../../models');
const { ValidationError } = require("sequelize");


class OrganizationService{

    /**
     * 
     * @param {*} requestData 
     * @param {*} authId 
     * @returns 
     */
    static async createRequest(requestData, authorId){

        const {provider, name,  hostUrl} = requestData;
      
        if(Validator.isEmpty(provider)) {
            throw new ValidationError("Provider is required!");
        }
        
        if(!Validator.isAlpa(provider)) {
            throw new ValidationError("Provider should be an alpha charecter!");
        }

        if(!["sonarcloud","brearcloud","mysticalcloud"].includes(provider)) {
            throw new ValidationError("Provider is missing!");
        }

        if(Validator.isEmpty(name)){
            throw new ValidationError("Name is required!");
        }

        if(!Validator.isAlpa(provider)) {
            throw new ValidationError("Name should be an alpha charecter!");
        }

        if(Validator.isEmpty(hostUrl)){
            throw new ValidationError("Host url is required!");
        }

        if(!Validator.isValidURL(hostUrl)) {
            throw new ValidationError("Url should be an valid!");
        }
        
        // create an project with uuid, projectType, authorId, key, url, domain, custom_domain, createdAt, updatedAt, deletedAt
        return await Organization.create({provider:provider, name: name, hostUrl: hostUrl});
    }

    /**
     * 
     * @param {*} requestData 
     * @param {*} authId 
     * @returns 
     */
    static async createProjectRequest(requestData, authorId, authorEmail){

        const {organizationUUID, projectKey, accessToken} = requestData;
      
        if(Validator.isEmpty(organizationUUID)) {
            throw new ValidationError("organization is required");
        }
        
        if(!Validator.isValidUUID4(organizationUUID)){
            throw new ValidationError("organization is invalid");
        }

        if(Validator.isEmpty(projectKey)) {
            throw new ValidationError("Project key is required");
        }
        
        if(!Validator.isAlpa(projectKey)) {
            throw new ValidationError("Project key is invalid");
        }

        if(Validator.isEmpty(accessToken)) {
            throw new ValidationError("Token is required");
        }
        
        if(!Validator.isAlpaNumber(accessToken)) {
            throw new ValidationError("Token is invalid");
        }

        return await OrganizationProject.create({organizationUUID: organizationUUID, authorId: authorId, projectKey: projectKey, accessToken: accessToken});
    }

    /**
     * 
     * @param {*} params 
     * @returns 
     */
    static async getOrganizationRequest(authId){
        return await Organization.findAll();
    }

    /**
     * 
     * @param {*} params 
     * @param {*} authId 
     * @returns 
     */
    static async listOrganizationInProviderRequest(params, authId){
        const {provider} = params;
 
        if(!provider || provider?.length > 20) throw new ValidationError("Provider is required Or exceed limit!");
      
        if(Validator.isInvalidContain(provider)) throw new ValidationError("Provider is invalid!");
         
        return await Organization.findAll({where:{provider: provider}});
        
    }

    /**
     * 
     * @param {*} params 
     * @param {*} authorId 
     * @returns 
     */
    static async listOrganizationProjectRequest(params, authorId){
        const {organizationUUID} = params;
        
        if(Validator.isEmpty(organizationUUID)) throw new ValidationError("organization is required");
        
        if(!Validator.isValidUUID4(organizationUUID)) throw new ValidationError("organization is invalid");
 
        /**
         * Check organization exists in auth user
         * TODO:
         */


        /**
         * Get all organization for auth user
         */
        return await OrganizationProject.findAll({where:{organizationUUID: organizationUUID, authorId: authorId}});
    }

}

module.exports = OrganizationService;