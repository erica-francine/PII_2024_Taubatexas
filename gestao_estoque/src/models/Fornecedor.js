const { Model, DataTypes } = require('sequelize');

class Fornecedores extends Model {
    static init(sequelize) {
        super.init({
            id_fornecedor: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            cnpj_fornecedor: {
                type: DataTypes.STRING,
                unique: true,
            },
            nome_fornecedor: {
                type: DataTypes.STRING,
                allowNull: false
            },
            telefone_fornecedor: {
                type: DataTypes.STRING,
            },
            status_fornecedor: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
            },

            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        }, {
            sequelize,
            tableName: 'fornecedores'
        });
    }
}


module.exports = Fornecedores

