module.exports = (function({sequelize, ProjectStage} ){

    class DatabaseConnection{
        /**
         * Connect to db server
         */
        async connect(){
            sequelize
            .authenticate()
            .then( async () => {
                console.log('Connection has been established successfully.');
            }).catch( async (error)=> {
                console.error('Unable to connect to the database:', error);
                await Logger.queueLog(error);
            });
        }

        /**
         * update project stage
         * 
         * @param {String} log 
         */
        async updateProjectStage(project){
            // update project stage table
            await ProjectStage.update({status: project.status === "done" ? "live" : project.status}, {where:{uuid: project.processId}});
        }
    }

    return DatabaseConnection;

})(require('../models'));