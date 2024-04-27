'use strict';


module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('movimentacoes', {
      id_movimentacao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },

      id_fornecedor:{
        type: Sequelize.INTEGER,
        references: { model: 'fornecedores', key: 'id_fornecedor'},
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },


      id_usuario:{
        type: Sequelize.INTEGER,
        references: { model: 'usuarios', key: 'id_usuario'},
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },

      
      id_robo:{
        type: Sequelize.INTEGER,
        references: { model: 'robos', key: 'id_robo'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },


      data_movimentacao: {
        type: Sequelize.DATE,
        allowNull: false
      },

      tipo_movimentacao: {
        type:Sequelize.STRING,
        allowNull: false
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
    return queryInterface.dropTable('movimentacoes')
  }
};

