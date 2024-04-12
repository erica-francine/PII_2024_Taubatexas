const Categoria = require('../models/Categoria');

module.exports = {

    async criarCategoria(req, res){
        const descricao_categoria = req.body;

        const categoria = await Categoria.create(descricao_categoria)

        return res.send(categoria)
    },


    async listarCategorias(req, res){
        const categorias = await Categoria.findAll()

        res.send(categorias)

    }
}