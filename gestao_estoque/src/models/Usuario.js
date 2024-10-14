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
                defaultValue: 'operador'
            },
            nome_usuario: {
                type: DataTypes.STRING,
                allowNull: false,
                validate:{
                    len: [3]
                }
            },
            email_usuario:{
                type:DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            senha_usuario:{
                type:DataTypes.STRING,
                allowNull: false,
                validate:{
                    len: [8]
                }

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
    static associate(models){
        this.hasMany(models.Movimentacoes, {foreignKey: 'id_usuario', as: 'movimentacoes'})
        
    }
}


module.exports = Usuarios

