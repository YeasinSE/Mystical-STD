'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Project.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    projectType: DataTypes.STRING,
    authorId: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    key: DataTypes.STRING,
    url: DataTypes.STRING,
    domain: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    deployVersion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    scanVersion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    },
    testVersion: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'projects'
  });
  return Project;
};