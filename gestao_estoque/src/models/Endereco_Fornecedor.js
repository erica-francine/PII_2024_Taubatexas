const { Model, DataTypes } = require('sequelize');

class Enderecos extends Model {
    static init(sequelize) {
        super.init({
            id_endereco_fornecedor: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },

            id_fornecedor: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'fornecedores', key: 'id_fornecedor' },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },

            logradouro_endereco_fornecedor: DataTypes.STRING,

            numero_endereco_fornecedor: DataTypes.INTEGER,

            rua_endereco_fornecedor: {
                type: DataTypes.STRING,
                allowNull: false
            },

            bairro_endereco_fornecedor: {
                type: DataTypes.STRING,
                allowNull: false
            },

            complemento_endereco_fornecedor: DataTypes.STRING,
            

            cidade_endereco_fornecedor: {
                type: DataTypes.STRING,
                allowNull: false
            },

            estado_endereco_fornecedor: {
                type: DataTypes.STRING,
                allowNull: false
            },

            cep_endereco_fornecedor: DataTypes.STRING,

            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        }, {
            sequelize,
            tableName: 'endereco_fornecedor'
        });
    }
}


module.exports = Enderecos

