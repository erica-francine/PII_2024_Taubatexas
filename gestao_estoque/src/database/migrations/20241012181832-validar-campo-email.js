'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('usuarios', 'email_usuario', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, // Validação de email
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('usuarios', 'email_usuario', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  }
  
};