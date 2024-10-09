'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adiciona a coluna `email`
    await queryInterface.addColumn('usuarios', 'email_usuario', {
      type: Sequelize.STRING,
      allowNull: false
    });

    // Adiciona a coluna `senha`
    await queryInterface.addColumn('usuarios', 'senha_usuario', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove a coluna `email`
    await queryInterface.removeColumn('usuarios', 'email_usuario');

    // Remove a coluna `senha`
    await queryInterface.removeColumn('usuarios', 'senha_usuario');
  }
};
