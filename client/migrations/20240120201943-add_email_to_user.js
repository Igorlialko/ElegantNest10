'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('users','firstName',{
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('users','lastName',{
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('users','displayName',{
      type: Sequelize.STRING,
      allowNull: true
    });
    await queryInterface.addColumn('users','image',{
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
