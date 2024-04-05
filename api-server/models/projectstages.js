'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProjectStage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ProjectStage.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    authorId:{
      type: DataTypes.STRING
    },
    organizationUUID:{
      type: DataTypes.UUID, // organization
    },
    organizationName:{
      type: DataTypes.STRING 
      //SCAN: sonarcloud, bearercloud, mysticalcloud etc
      //DEPLOY: awscloud, digtaloceancloud, azurcloud etc
    },
    orgProjectUUID:{
      type: DataTypes.UUID
    },
    projectUUID:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    stage: DataTypes.STRING, //scan, test and deploy
    status: DataTypes.STRING, //processing, done, error and live
    version: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: "ProjectStage",
    tableName: 'projectstages',
  });
  return ProjectStage;
};