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

            id_projeto: {
                type: DataTypes.INTEGER,
                references: { model: 'projetos', key: 'id_projeto' },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
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
}


module.exports = Robos