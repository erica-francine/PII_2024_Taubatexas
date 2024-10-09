const express = require('express');
const routes = express.Router();
const userController = require('../controllers/UsuariosController')

routes.post('/register', userController.register)

routes.post('/login', userController.login)


routes.get('/', userController.listarUsuarios)

routes.post('/inativar', express.urlencoded({extended: true}), userController.inativarUsuario)
routes.post('/ativar', express.urlencoded({extended: true}), userController.ativarUsuario)

routes.delete('/delete', express.urlencoded({extended: true}), userController.deletarUsuario)

module.exports = routes