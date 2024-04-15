const express = require('express');
const routes = express.Router();
const CategoriaController = require('../controllers/CategoriaController');
const EstoqueController = require('../controllers/EstoqueController')


routes.get('/',(req, res)=>{
    return res.send('Hello World')
} )


routes.get('/categorias', CategoriaController.listarCategorias)
routes.post('/categorias', express.urlencoded({extended: true}), CategoriaController.criarCategoria)


routes.get('/estoques', EstoqueController.listarEstoques)
routes.post('/estoques',express.urlencoded({extended: true}), EstoqueController.criarEstoque)

module.exports = routes;