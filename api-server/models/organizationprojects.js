'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrganizationProject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrganizationProject.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    organizationUUID: {
      type: DataTypes.UUID,
    },
    authorId: {
      type: DataTypes.STRING
    },
    projectKey: {
      type: DataTypes.STRING
    },
    accessToken: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    tableName: 'organizationprojects',
    modelName: 'OrganizationProject'
    
  });
  return OrganizationProject;
};