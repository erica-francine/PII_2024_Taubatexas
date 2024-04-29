const { Model, DataTypes } = require('sequelize');

class Robos extends Model {
    static init(sequelize) {
        super.init({
            id_robo: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            nome_robo: {
                type: DataTypes.STRING,
                allowNull: false
            },

            tipo_robo: DataTypes.STRING,

            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        }, {
            sequelize,
            tableName: 'robos'
        });
    }

    static associate(models){
        this.belongsTo(models.Projetos, {foreignKey: 'id_projeto', as: 'projeto'})
        this.hasMany(models.Movimentacoes, {foreignKey: 'id_robo', as: 'movimentacoes'})
    }
}


module.exports = Robos