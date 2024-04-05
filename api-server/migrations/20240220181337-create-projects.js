'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uuid: {
        type: Sequelize.UUID
      },
      projectType: {
        type: Sequelize.STRING,
        allowNull: false
      },
      authorId: {
        type: Sequelize.STRING,
        allowNull: true
      },
      key: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false
      },
      domain: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: true,
        defaultValue: null
      },
      deployVersion: {
        type: Sequelize.INTEGER,
        defaultValue: 0 // last deploy version
      },
      scanVersion: {
        type: Sequelize.INTEGER,
        defaultValue: 0 // last scan version
      },
      testVersion: {
        type: Sequelize.INTEGER,
        defaultValue: 0 // last test version
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
    await queryInterface.dropTable('projects');
  }
};