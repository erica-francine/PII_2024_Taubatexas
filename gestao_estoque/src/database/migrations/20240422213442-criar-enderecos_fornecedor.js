'use strict';

const { Model } = require("sequelize");


module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('endereco_fornecedor', {
      id_endereco_fornecedor: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },

      id_fornecedor:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'fornecedores', key: 'id_fornecedor'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },


      logradouro_endereco_fornecedor: {
        type: Sequelize.STRING,
      },

      numero_endereco_fornecedor:{
        type: Sequelize.INTEGER,
      },

      rua_endereco_fornecedor:{
        type: Sequelize.STRING,
        allowNull: false
      },
      bairro_endereco_fornecedor: {
        type: Sequelize.STRING,
        allowNull: false
      },

      complemento_endereco_fornecedor: {
        type: Sequelize.STRING,
      },

      cidade_endereco_fornecedor: {
        type: Sequelize.STRING,
        allowNull: false
      },
      
      estado_endereco_fornecedor: {
        type: Sequelize.STRING,
        allowNull: false
      },

      cep_endereco_fornecedor: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable('endereco_fornecedor')
  }
};

