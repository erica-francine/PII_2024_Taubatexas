const express = require('express');
const routes = express.Router();
const CategoriaController = require('../controllers/CategoriaController');
const EstoqueController = require('../controllers/EstoqueController');
const UsuariosController = require('../controllers/UsuariosController');
const FornecedorController = require('../controllers/FornecedorController')
const ProjetoController = require('../controllers/ProjetoController')
const EnderecoController = require('../controllers/EnderecosController')

routes.get('/',(req, res)=>{
    return res.send('Hello World')
} )


routes.get('/categorias', CategoriaController.listarCategorias)
routes.post('/categorias', express.urlencoded({extended: true}), CategoriaController.criarCategoria)

0
routes.get('/estoques', EstoqueController.listarEstoques)
routes.post('/estoques',express.urlencoded({extended: true}), EstoqueController.criarEstoque)

routes.get('/usuarios', UsuariosController.listarUsuarios)
routes.post('/usuarios', express.urlencoded({extended: true}), UsuariosController.criarUsuario)
routes.post('/usuarios/inativar', express.urlencoded({extended: true}), UsuariosController.inativarUsuario)
routes.post('/usuarios/ativar', express.urlencoded({extended: true}), UsuariosController.ativarUsuario)
routes.delete('/usuarios', express.urlencoded({extended: true}), UsuariosController.deletarUsuario)

routes.get('/fornecedores', FornecedorController.listarFornecedores)
routes.post('/fornecedores', express.urlencoded({extended: true}), FornecedorController.criarFornecedor)
routes.post('/fornecedores/inativar', express.urlencoded({extended: true}), FornecedorController.inativarFornecedor)
routes.post('/fornecedores/ativar', express.urlencoded({extended: true}), FornecedorController.ativarFornecedor)
routes.delete('/fornecedores', express.urlencoded({extended: true}), FornecedorController.deletarFornecedor)


routes.get('/projetos', ProjetoController.listarProjetos)
routes.post('/projetos', express.urlencoded({extended: true}), ProjetoController.criarProjeto)
routes.delete('/projetos', express.urlencoded({extended: true}), ProjetoController.deletarProjeto)


routes.post('/fornecedores/:id_fornecedor/enderecos', express.urlencoded({extended: true}), EnderecoController.criarEndereco)
routes.delete('/fornecedores/:id_fornecedor/enderecos', express.urlencoded({extended: true}), EnderecoController.deletarEndereco)

module.exports = routes;