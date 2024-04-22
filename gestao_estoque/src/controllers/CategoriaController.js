const Categoria = require('../models/Categoria');

module.exports = {

    async criarCategoria(req, res){
        try {
            const descricao_categoria = req.body;

            const categoria = await Categoria.create(descricao_categoria);

            return res.send(categoria);
        } catch (error) {
            console.error("Erro ao criar categoria:", error);
            return res.status(500).send({ error: "Erro ao criar a categoria. Por favor, tente novamente." });
        }
    },


    async listarCategorias(req, res){
        try {
            const categorias = await Categoria.findAll();
            res.send(categorias);
        } catch (error) {
            console.error("Erro ao listar categorias:", error);
            return res.status(500).send({ error: "Erro ao obter a lista de categorias. Por favor, tente novamente." });
        }
    }
};
