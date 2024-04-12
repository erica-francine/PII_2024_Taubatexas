// const { underscoredIf } = require("sequelize/lib/utils");

module.exports = {
    dialect:"mysql",
    host:"localhost",
    username:"root",
    password:"mysql",
    database:"gestao_estoque",
    port:"3306",
    define: {
        timestamps: true,
        underscored: true,
    }

}

