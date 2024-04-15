const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Categoria = require('../models/Categoria')
const Estoque = require('../models/Estoque')

const connection = new Sequelize(dbConfig)

Categoria.init(connection);
Estoque.init(connection);


module.exports = connection;