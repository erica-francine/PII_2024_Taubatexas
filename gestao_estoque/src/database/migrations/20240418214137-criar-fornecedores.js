'use strict';


module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('fornecedores', {
      id_fornecedor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },
      cnpj_fornecedor: {
        type: Sequelize.STRING,
        unique: true,
      },
      nome_fornecedor: {
        type: Sequelize.STRING,
        allowNull:false
      },
      telefone_fornecedor:{
        type: Sequelize.STRING,
      },
      status_fornecedor: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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

  down (queryInterface, Sequelize) {
    return queryInterface.dropTable('fornecedores')
  }
};

