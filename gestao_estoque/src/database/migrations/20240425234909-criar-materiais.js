'use strict';


module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('materiais', {
      id_material: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },

      id_categoria:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'categorias', key: 'id_categoria'},
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },


      id_estoque:{
        type: Sequelize.INTEGER,
        references: { model: 'estoque', key: 'id_estoque'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },


      descricao_material: {
        type: Sequelize.STRING,
        allowNull: false
      },

      unid_medida_material: {
        type:Sequelize.STRING,
        allowNull: false
      },

      quantidade_material:{
        type: Sequelize.DOUBLE,
        defaultValue: 0,
      },

      status_material: {
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
    return queryInterface.dropTable('materiais')
  }
};

