const {Organization, OrganizationProject}= require("../../models");

class OrganizationSearch{
    
    /**
     * Execute query to database
     *
     * @param finalSQL
     * @returns {Promise<{result: *, totalRows: *}>}
    */
    static executeSQL = async (finalSQL) => {
        return await sequelize.query(finalSQL, {type: sequelize.QueryTypes.SELECT});
    };

    static getProjectWhere = async (where) => await Project.findOne({where: where});

    static getProjectStageWhere = async (where) => await ProjectStage.findOne({where: where});

    static getProjectInStage = async (projectId, stage, status) => {
        return await this.executeSQL('SELECT PR.key AS projectKey, PR.url AS projectUrl, PR.domain,'+
            ' PR.customDomain,PR.version AS activeversion, PS.stage, PS.status' +
            ' FROM projects AS PR' +
            ' INNER JOIN projectstages AS PS ON PS.projectId=PR.uuid'+
            ' WHERE PR.stage="'+ stage +'" AND PR.status="'+ status +'" WHERE PR.uuid="'+ projectId +'"');
    };
}

module.exports = OrganizationSearch;