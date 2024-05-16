'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Adiciona a coluna `valor_unitario`
    await queryInterface.addColumn('itens_movimentacao', 'valor_unit', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0
    });

    // Adiciona a coluna `valor_total`
    await queryInterface.addColumn('itens_movimentacao', 'valor_total', {
      type: Sequelize.FLOAT,
      allowNull: false,
      defaultValue: 0
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove a coluna `valor_unitario`
    await queryInterface.removeColumn('itens_movimentacao', 'valor_unit');

    // Remove a coluna `valor_total`
    await queryInterface.removeColumn('itens_movimentacao', 'valor_total');
  }
};
