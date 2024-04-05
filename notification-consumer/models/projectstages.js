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
    projectUUID: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    stage: DataTypes.STRING,
    status: DataTypes.STRING,
    version: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: "ProjectStage",
    tableName: 'projectstages',
  });
  return ProjectStage;
};