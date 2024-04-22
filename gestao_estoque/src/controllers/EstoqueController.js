const Estoque = require('../models/Estoque');

module.exports = {

    async criarEstoque(req, res){
        try {
            const localizacao_estoque = req.body;

            const estoque = await Estoque.create(localizacao_estoque);

            return res.send(estoque);
        } catch (error) {
            console.error("Erro ao criar estoque:", error);
            return res.status(500).send({ error: "Erro ao criar o estoque. Por favor, tente novamente." });
        }
    },


    async listarEstoques(req, res){
        try {
            const estoques = await Estoque.findAll();
            res.send(estoques);
        } catch (error) {
            console.error("Erro ao listar estoques:", error);
            return res.status(500).send({ error: "Erro ao obter a lista de estoques. Por favor, tente novamente." });
        }
    }
};
