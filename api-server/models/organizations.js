'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Organization.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    provider: {
      type: DataTypes.STRING
    },
    name: {
      type: DataTypes.STRING,
    },
    hostUrl: {
      type: DataTypes.STRING
    },
  }, {
    sequelize,
    tableName: 'organizations',
    modelName: 'Organization'
  });
  return Organization;
};