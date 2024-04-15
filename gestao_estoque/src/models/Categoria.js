const { Model, DataTypes } = require('sequelize');

class Categorias extends Model {
    static init(sequelize) {
        super.init({
            id_categoria: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            descricao_categoria: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        }, {
            sequelize,
            tableName: 'categorias'
        });
    }
}


module.exports = Categorias

