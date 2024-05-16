const { Model, DataTypes } = require('sequelize');

class Itens_Movimentacoes extends Model {
    static init(sequelize) {
        super.init({
            id_item_movimentacao: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            quantidade_material: {
                type: DataTypes.DOUBLE,
                allowNull: false
            },

            valor_unit: {
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0
            },

            valor_total:{
                type: DataTypes.FLOAT,
                allowNull: false,
                defaultValue: 0
            },

            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        }, {
            sequelize,
            tableName: 'itens_movimentacao'
        });

    }

    static associate(models) {
        this.belongsTo(models.Materiais, { foreignKey: 'id_material', as: 'material' })
        this.belongsTo(models.Movimentacoes, { foreignKey: 'id_movimentacao', as: 'movimentacao' })

    }
}


module.exports = Itens_Movimentacoes