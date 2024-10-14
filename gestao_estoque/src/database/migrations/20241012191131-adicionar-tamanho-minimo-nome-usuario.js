'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('usuarios', 'nome_usuario', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [3] // Define o tamanho mínimo como 3 caracteres
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('usuarios', 'nome_usuario', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
