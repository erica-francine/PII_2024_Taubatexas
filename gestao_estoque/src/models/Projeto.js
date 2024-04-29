const { Model, DataTypes } = require('sequelize');

class Projetos extends Model {
    static init(sequelize) {
        super.init({
            id_projeto: {
              type: DataTypes.INTEGER,
              primaryKey: true,
              autoIncrement:true,
              allowNull: false,
            },
            local_projeto: DataTypes.STRING,
            descricao_projeto: DataTypes.STRING,
            data_final_projeto: DataTypes.DATE,
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE
      
          }, {
            sequelize,
            tableName: 'projetos'
        });
    }

    static associate(models){
      this.hasMany(models.Robos, {foreignKey: 'id_projeto', as: 'robos'})
  }
}


module.exports = Projetos

