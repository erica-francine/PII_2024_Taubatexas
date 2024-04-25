const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Categoria = require('../models/Categoria')
const Estoque = require('../models/Estoque');
const Usuario = require('../models/Usuario');
const Fornecedor = require('../models/Fornecedor');
const Projeto = require('../models/Projeto');
const Enderecos = require('../models/Endereco_Fornecedor')
const Robo = require('../models/Robo')
const connection = new Sequelize(dbConfig)

Categoria.init(connection);
Estoque.init(connection);
Usuario.init(connection);
Fornecedor.init(connection);
Projeto.init(connection);
Enderecos.init(connection);
Robo.init(connection);


module.exports = connection;