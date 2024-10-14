'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('usuarios', 'funcao_usuario', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'operador', // Define o valor padrão como 'operador', perfil com menor nível de acesso da app
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('usuarios', 'funcao_usuario', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  }
};
