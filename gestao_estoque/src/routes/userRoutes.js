const express = require('express');
const routes = express.Router();
const userController = require('../controllers/UsuariosController')

routes.post('/register', userController.register)

routes.post('/login', userController.login)

module.exports = routes