'use strict';


module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('robos', {
      id_robo: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },

      id_projeto:{
        type: Sequelize.INTEGER,
        references: { model: 'projetos', key: 'id_projeto'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      nome_robo: {
        type: Sequelize.STRING,
        allowNull: false
      },

      tipo_robo: {
        type:Sequelize.STRING,
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
    return queryInterface.dropTable('robos')
  }
};

