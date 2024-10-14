const express = require('express');
const router = express.Router();
const CategoriaController = require('../controllers/CategoriaController');
const EstoqueController = require('../controllers/EstoqueController');
const UsuariosController = require('../controllers/UsuariosController');
const FornecedorController = require('../controllers/FornecedorController')
const ProjetoController = require('../controllers/ProjetoController')
const EnderecoController = require('../controllers/EnderecosController')
const RoboController = require('../controllers/RoboController')
const MateriaisController = require('../controllers/MateriaisController')
const MovController = require('../controllers/MovimentacaoController')
const ItemController = require('../controllers/ItemMovimentacaoController')
const authController = require('../controllers/AuthController')
const authProfile = require('../controllers/AuthProfileController')

router.get('/',(req, res)=>{
    res.render('index', {error:false, body:{}})
}, MateriaisController.listarMateriais)

router.use(authController)

router.get('/categorias', authProfile(['admin', 'gestor', 'operador']), CategoriaController.listarCategorias)
router.post('/categorias',authProfile(['admin', 'gestor']), express.urlencoded({extended: true}), CategoriaController.criarCategoria)


router.get('/estoques', authProfile(['admin', 'gestor', 'operador']), EstoqueController.listarEstoques)
router.post('/estoques',authProfile(['admin', 'gestor']), express.urlencoded({extended: true}), authProfile(['admin', 'gestor']), EstoqueController.criarEstoque)



router.get('/fornecedores', authProfile(['admin', 'gestor', 'operador']),FornecedorController.listarFornecedores)
router.post('/fornecedores',authProfile(['admin', 'gestor']), express.urlencoded({extended: true}), FornecedorController.criarFornecedor)
router.post('/fornecedores/inativar', authProfile(['admin', 'gestor']), express.urlencoded({extended: true}), FornecedorController.inativarFornecedor)
router.post('/fornecedores/ativar', authProfile(['admin', 'gestor']), express.urlencoded({extended: true}), FornecedorController.ativarFornecedor)
router.delete('/fornecedores', authProfile(['admin', 'gestor']), express.urlencoded({extended: true}), FornecedorController.deletarFornecedor)


router.get('/projetos', authProfile(['admin', 'gestor', 'operador']), ProjetoController.listarProjetos)
router.post('/projetos', authProfile(['admin', 'gestor']), express.urlencoded({extended: true}), ProjetoController.criarProjeto)
router.delete('/projetos', authProfile(['admin', 'gestor']), express.urlencoded({extended: true}), ProjetoController.deletarProjeto)

router.get('/fornecedores/:id_fornecedor/enderecos', authProfile(['admin', 'gestor', 'operador']), EnderecoController.listarEnderecos)
router.post('/fornecedores/:id_fornecedor/enderecos', authProfile(['admin', 'gestor']), express.urlencoded({extended: true}), EnderecoController.criarEndereco)
router.delete('/fornecedores/:id_fornecedor/enderecos/:id_endereco', authProfile(['admin', 'gestor']), express.urlencoded({extended: true}), EnderecoController.deletarEndereco)

router.get('/robos', authProfile(['admin', 'gestor', 'operador']), RoboController.listarRobos)
router.post('/projetos/:id_projeto/robos', authProfile(['admin', 'gestor']), express.urlencoded({extended: true}), RoboController.criarRobo)
router.delete('/projetos/:id_projeto/robos/:id_robo', authProfile(['admin', 'gestor']), express.urlencoded({extended: true}), RoboController.deletarRobo)


// router.get('/materiais',  (req, res, next) => {
//     MateriaisController.listarMateriais(req, {
//         json: (materiais) => {
//             res.render('materiais', { materiais:materiais, tipo_movimentacao: req.params.tipo_movimentacao, params: req.originalUrl});
//         }
//     })
// })

router.get('/materiais',authProfile(['admin', 'gestor', 'operador']),  MateriaisController.listarMateriais)

router.post('/materiais',authProfile(['admin', 'gestor']) , express.urlencoded({extended: true}), MateriaisController.cadastrarMaterial)
router.post('/materiais/:id_material', authProfile(['admin', 'gestor']), MateriaisController.ativarMaterial)
router.post('/materiais/:id_material',authProfile(['admin', 'gestor']), MateriaisController.inativarMaterial)
router.delete('/materiais/:id_material', authProfile(['admin', 'gestor']), MateriaisController.deletarMaterial)

router.get('/movimentacoes/itens_movimentacao', authProfile(['admin', 'gestor', 'operador']), ItemController.listarItensMov)
router.get('/movimentacoes', authProfile(['admin', 'gestor', 'operador']), MovController.listarMov,)
router.get('/movimentacoes/:tipo_movimentacao', authProfile(['admin', 'gestor', 'operador']), (req, res)=>{
    res.render('mov', {error:false, body:{}, tipo_movimentacao: req.params.tipo_movimentacao})
})

router.get('/movimentacoes/:tipo_movimentacao/itens_movimentacao', authProfile(['admin', 'gestor', 'operador']), (req, res)=>{
    res.render('itens_mov', {error:false, body:{}, tipo_movimentacao: req.params.tipo_movimentacao})
})


router.get('/movimentacoes/:tipo_movimentacao/itens_movimentacao/materiais', authProfile(['admin', 'gestor', 'operador']), (req, res, next) => {
    MateriaisController.listarMateriais(req, {
        json: (materiais) => {
            res.render('materiais', { materiais:materiais, tipo_movimentacao: req.params.tipo_movimentacao, params: req.params});
        }
    });
})


router.post('/movimentacoes/:tipo_movimentacao', authProfile(['admin', 'gestor', 'operador']), MovController.realizarMov, ItemController.addItemMov,MovController.attEstoque)


module.exports = router;