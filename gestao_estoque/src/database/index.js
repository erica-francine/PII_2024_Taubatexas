const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Categoria = require('../models/Categoria')
const Estoque = require('../models/Estoque');
const Usuario = require('../models/Usuario');
const Fornecedor = require('../models/Fornecedor');
const Projeto = require('../models/Projeto');
const Enderecos = require('../models/Endereco_Fornecedor')
const Robo = require('../models/Robo')
const Materiais = require('../models/Material');
const Movimentacao = require('../models/Movimentacao');

const connection = new Sequelize(dbConfig)

Categoria.init(connection);
Estoque.init(connection);
Usuario.init(connection);
Fornecedor.init(connection);
Projeto.init(connection);
Enderecos.init(connection);
Robo.init(connection);
Materiais.init(connection);
Movimentacao.init(connection)

Fornecedor.associate(connection.models);
Enderecos.associate(connection.models);
Materiais.associate(connection.models);
Movimentacao.associate(connection.models);
Robo.associate(connection.models);



module.exports = connection;