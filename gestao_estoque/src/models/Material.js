const { Model, DataTypes } = require('sequelize');

class Materiais extends Model {
    static init(sequelize) {
        super.init({
            id_material: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement:true,
                allowNull: false,
              },
        
              id_categoria:{
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'categorias', key: 'id_categoria'},
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT',
              },
        
        
              id_estoque:{
                type: DataTypes.INTEGER,
                references: { model: 'estoque', key: 'id_estoque'},
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
              },
        
        
              descricao_material: {
                type: DataTypes.STRING,
                allowNull: false
              },
        
              unid_medida_material: {
                type:DataTypes.STRING,
                allowNull: false
              },
        
              quantidade_material:{
                type: DataTypes.DOUBLE,
                defaultValue: 0,
              },
        
              status_material: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
              },

            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
        }, {
            sequelize,
            tableName: 'materiais'
        });
    }
}


module.exports = Materiais
