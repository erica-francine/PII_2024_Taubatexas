const Fornecedor = require('../models/Fornecedor')
const Usuario = require('../models/Usuario')
const Robo = require('../models/Robo')
const Mov = require('../models/Movimentacao')
const Material = require('../models/Material')


module.exports = {

    async realizarMov(req, res, next) {

        try {
            const { tipo_movimentacao } = req.params;


            const { id_fornecedor, id_usuario, id_robo, data_movimentacao } = req.body;



            const fornecedor = await Fornecedor.findByPk(id_fornecedor)
            const usuario = await Usuario.findByPk(id_usuario)
            const robo = await Robo.findByPk(id_robo)

            if (!fornecedor) {
                res.status(400).send({ error: `Fornecedor não encontrado.` })
            }

            if (!usuario) {
                res.status(400).send({ error: `Usuario não encontrado.` })
            }

            if (!robo) {
                res.status(400).send({ error: `Robo não encontrado.` })
            }

            //Verificando se estou passando itens para a movimentação
            if (!req.body.itensMovimentacao || req.body.itensMovimentacao.length == 0) {
                return res.status(400).send({ error: 'Nenhum item adicionado na movimentação.' })
            }

            const movimentacao = await Mov.create({ id_fornecedor, id_usuario, id_robo, data_movimentacao, tipo_movimentacao });

            res.send(movimentacao)

            next()

            

        } catch (error) {

            console.error("Erro ao realizar movimentação", error);

            return res.status(500).send({ error: "Erro ao realizar movimentação. Por favor, tente novamente." });
        }

    },

    async listarMov(req, res) {
        try {
            const movimentacoes = await Mov.findAll();
            res.send(movimentacoes);
        } catch (error) {

            console.error("Erro ao listar movimentações:", error);

            return res.status(500).send({ error: "Erro ao obter a lista de movimentações. Por favor, tente novamente." });
        }

    },


    async deletarMov(req, res) {
        const { id_mov } = req.params;

        try {
            const movimentacao = await Mov.findByPk(id_mov);

            if (!movimentacao) {
                return res.status(404).send({ error: "Movimentação não encontrada." });
            }

            await movimentacao.destroy();

            return res.send({ message: "Movimentação deletada com sucesso." });

        } catch (error) {

            return res.status(500).send({ error: "Erro ao deletar movimentação" });
        }
    },

    async attEstoque(req, res, next) {

        try {

            const { tipo_movimentacao } = req.params
            const { itens_movimentacao } = req.body

            for (const item of itens_movimentacao) {

                const material = await Material.findByPk(item.id_material)

                if (!material) {
                    return res.status(404).send({ error: `Material não encontrado` });
                }

                if (tipo_movimentacao === 'entrada') {
                    material.quantidade_material += item.quantidade_material
                } else if (tipo_movimentacao === 'saida') {
                    if (material.quantidade_material < item.quantidade_material) {
                        throw new Error(`Quantidade insuficiente de ${material.descricao_material} no estoque`)
                    }

                    material.quantidade_material -= item.quantidade_material
                }

                await material.save()
            }

            next()

        } catch (error) {
            res.status(500).send({error: `Erro ao dar ${tipo_movimentacao} nos materiais`})
        }

    }



}