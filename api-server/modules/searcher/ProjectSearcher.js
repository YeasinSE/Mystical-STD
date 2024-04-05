const {Project, ProjectStage, sequelize}= require("../../models");

class ProjectSearch{
    
    /**
     * Execute query to database
     *
     * @param finalSQL
     * @returns {Promise<{result: *, totalRows: *}>}
    */
    static executeSQL = async (finalSQL) => {
        return await sequelize.query(finalSQL, {type: sequelize.QueryTypes.SELECT, });
    };

    static getProjectWhere = async (where) => await Project.findOne({where: where});

    static getProjectStageWhere = async (where) => await ProjectStage.findOne({where: where});

    static getOrganizationProject = async (organizationId, projectId, authorId) => {
        return await this.executeSQL(`SELECT "ORG"."provider", "ORG"."name", "ORG"."hostUrl", "ORGP"."projectKey", "ORGP"."accessToken" 
        FROM "organizations" AS "ORG" 
        INNER JOIN "organizationprojects" AS "ORGP" ON "ORGP"."organizationUUID"="ORG"."uuid" 
        WHERE "ORG"."uuid"='${organizationId}' AND "ORGP"."authorId"='${authorId}' AND "ORGP"."uuid"='${projectId}'`);
    };
}

module.exports = ProjectSearch;