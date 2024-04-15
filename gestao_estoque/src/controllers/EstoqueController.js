const Estoque = require('../models/Estoque');

module.exports = {

    async criarEstoque(req, res){
        const descricao_estoque = req.body;

        const estoque = await Estoque.create(descricao_estoque)

        return res.send(estoque)
    },


    async listarEstoques(req, res){
        const estoques = await Estoque.findAll()

        res.send(estoques)

    }
}