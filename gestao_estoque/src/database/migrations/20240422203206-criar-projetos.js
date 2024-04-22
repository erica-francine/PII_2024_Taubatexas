'use strict';


module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('projetos', {
      id_projeto: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },
      descricao_projeto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      local_projeto: {
        type:Sequelize.STRING,
      },
      data_final_projeto:{
        type: Sequelize.DATE,
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
    return queryInterface.dropTable('projetos')
  }
};

