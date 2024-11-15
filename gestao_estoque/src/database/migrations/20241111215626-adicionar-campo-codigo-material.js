'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('materiais', 'codigo_material', {
      type: Sequelize.STRING,
      allowNull: false, 
      unique: true      
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('materiais', 'codigo_material');
  }
};