'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('usuarios', 'senha_usuario', {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [8], // Validação para exigir pelo menos 8 caracteres
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('usuarios', 'senha_usuario', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
