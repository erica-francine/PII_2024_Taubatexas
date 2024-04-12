const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Categoria = require('../models/Categoria')

const connection = new Sequelize(dbConfig)

Categoria.init(connection);

module.exports = connection;