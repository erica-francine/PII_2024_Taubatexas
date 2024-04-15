'use strict';


module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.createTable('usuarios', {
      id_usuario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false,
      },
      funcao_usuario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nome_usuario: {
        type: Sequelize.STRING,
        allowNull:false
      },
      status_usuario: {
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
    return queryInterface.dropTable('usuarios')
  }
};

