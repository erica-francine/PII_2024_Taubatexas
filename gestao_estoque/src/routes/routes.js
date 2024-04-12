const express = require('express');
const routes = express.Router();
const CategoriaController = require('../controllers/CategoriaController');



routes.get('/',(req, res)=>{
    return res.send('Hello World')
} )


routes.get('/categorias', CategoriaController.listarCategorias)
routes.post('/categorias', express.urlencoded({extended: true}), CategoriaController.criarCategoria)

module.exports = routes;