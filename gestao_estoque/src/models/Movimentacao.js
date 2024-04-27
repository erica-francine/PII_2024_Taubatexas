const { Model, DataTypes } = require('sequelize');

class Movimentacoes extends Model {
    static init(sequelize) {
        super.init({
            id_movimentacao: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },


            data_movimentacao: {
                type: DataTypes.DATE,
                allowNull: false
            },

            tipo_movimentacao: {
                type: DataTypes.STRING,
                allowNull: false
            },


            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        }, {
            sequelize,
            tableName: 'movimentacoes'
        });
    }

    static associate(models){
        this.belongsTo(models.Fornecedores, {foreignKey: 'id_fornecedor', as: 'fornecedor'})
        this.belongsTo(models.Usuarios, {foreignKey: 'id_usuario', as: 'usuario'})
        this.belongsTo(models.Robos, {foreignKey: 'id_robo', as: 'robo'})
  
    }
}


module.exports = Movimentacoes