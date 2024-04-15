const { Model, DataTypes } = require('sequelize');

class Usuarios extends Model {
    static init(sequelize) {
        super.init({
            id_usuario: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            funcao_usuario: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            nome_usuario: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status_usuario: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },

            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        }, {
            sequelize,
            tableName: 'usuarios'
        });
    }
}


module.exports = Categorias

