'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up  (queryInterface, Sequelize) {
    return queryInterface.createTable('categorias', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },
      descricao_categoria: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },

    })

  },

  async down (queryInterface, Sequelize) {
    return queryInterface.dropTable('categorias')
  }
};
