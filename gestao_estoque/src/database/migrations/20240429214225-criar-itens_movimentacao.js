'use strict';


module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('itens_movimentacao', {
      id_item_movimentacao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },

      id_material:{
        type: Sequelize.INTEGER,
        references: { model: 'materiais', key: 'id_material'},
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        allowNull: false
      },

      
      id_movimentacao:{
        type: Sequelize.INTEGER,
        references: { model: 'movimentacoes', key: 'id_movimentacao'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false
      },

      quantidade_material:{
        type: Sequelize.DOUBLE,
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
    return queryInterface.dropTable('itens_movimentacao')
  }
};

