const express = require('express');
const routes = express.Router();
const CategoriaController = require('../controllers/CategoriaController');
const EstoqueController = require('../controllers/EstoqueController');
const UsuariosController = require('../controllers/UsuariosController');


routes.get('/',(req, res)=>{
    return res.send('Hello World')
} )


routes.get('/categorias', CategoriaController.listarCategorias)
routes.post('/categorias', express.urlencoded({extended: true}), CategoriaController.criarCategoria)


routes.get('/estoques', EstoqueController.listarEstoques)
routes.post('/estoques',express.urlencoded({extended: true}), EstoqueController.criarEstoque)

routes.get('/usuarios', UsuariosController.listarUsuarios)
routes.post('/usuarios', express.urlencoded({extended: true}), UsuariosController.criarUsuario)
routes.post('/usuarios/inativar', express.urlencoded({extended: true}), UsuariosController.inativarUsuario)
routes.post('/usuarios/ativar', express.urlencoded({extended: true}), UsuariosController.ativarUsuario)
routes.delete('/usuarios', express.urlencoded({extended: true}), UsuariosController.deletarUsuario)

module.exports = routes;