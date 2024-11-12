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


    static associate(models){
      this.belongsTo(models.Categorias, {foreignKey: 'id_categoria', as: 'categoria'})
      this.belongsTo(models.Estoques, {foreignKey: 'id_estoque', as: 'estoque'})
      this.hasMany(models.Itens_Movimentacoes, {foreignKey: 'id_material', as: 'itens_movimentacoes'})

  }
}


module.exports = Materiais
