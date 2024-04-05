'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projectstages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID
      },
      authorId: {
        type: Sequelize.STRING
      },
      organizationUUID: {
        type: Sequelize.UUID, // organization
      },
      organizationName: {
        type: Sequelize.STRING //sonarcloud, bearercloud, mystical etc
      },
      orgProjectUUID: {
        type: Sequelize.UUID, // organization project
      },
      projectUUID: {
        type: Sequelize.UUID // customer project exp: github project
      },
      stage: {
        type: Sequelize.STRING //scan, test and deploy
      },
      status: {
        type: Sequelize.STRING //processing, done, error and live
      },
      version: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0 // active stage version
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('projectstages');
  }
};