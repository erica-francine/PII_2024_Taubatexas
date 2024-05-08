const Fornecedor = require('../models/Fornecedor')
const Usuario = require('../models/Usuario')
const Robo = require('../models/Robo')
const Mov = require('../models/Movimentacao')
const Material = require('../models/Material')
const connection = require('../database/index')

module.exports = {

    async realizarMov(req, res, next) {
        const t = await connection.transaction();

        try {
            const { tipo_movimentacao } = req.params;


            const { id_fornecedor, id_usuario, id_robo, data_movimentacao, itens_movimentacao } = req.body;


            //Verificando se estou passando itens para a movimentação


            if (!itens_movimentacao || itens_movimentacao.length === 0) {

                throw new Error('Nenhum item adicionado na movimentação.');

            }

            if (tipo_movimentacao === 'entrada') {
                const fornecedor = await Fornecedor.findByPk(id_fornecedor, { transaction: t });
                if (!fornecedor) {
                    throw new Error(`Fornecedor não encontrado.`);
                }


                movimentacao = await Mov.create({ id_fornecedor, data_movimentacao, tipo_movimentacao }, { transaction: t });
                req.id_movimentacao = movimentacao.id_movimentacao;


            } else if (tipo_movimentacao === 'saida') {
                const usuario = await Usuario.findByPk(id_usuario, { transaction: t });
                const robo = await Robo.findByPk(id_robo, { transaction: t });


                if (!usuario) {
                    throw new Error(`Usuario não encontrado.`);
                }

                if (!robo) {
                    throw new Error(`Robo não encontrado.`);
                }

                movimentacao = await Mov.create({ id_usuario, id_robo, data_movimentacao, tipo_movimentacao }, { transaction: t });
                req.id_movimentacao = movimentacao.id_movimentacao;

            } else {
                throw new Error('Tipo de movimentação inválida.');


            }


            req.transaction = t;

            next()



        } catch (error) {
            await t.rollback();
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

    async attEstoque(req, res) {
        const t = req.transaction;

        try {

            const { tipo_movimentacao } = req.params
            const { itens_movimentacao } = req.body


            for (const item of itens_movimentacao) {

                const material = await Material.findByPk(item.id_material, { transaction: t });

                if (!material) {
                    throw new Error(`Material não encontrado`)
                }

                if (tipo_movimentacao === 'entrada') {
                    material.quantidade_material += item.quantidade_material
                } else if (tipo_movimentacao === 'saida') {
                    if (material.quantidade_material < item.quantidade_material) {
                        throw new Error(`Quantidade insuficiente de ${material.descricao_material} no estoque`)
                    }

                    material.quantidade_material -= item.quantidade_material
                }

                await material.save({ transaction: t });
            }

            await t.commit();

            res.status(200).send({ message: "Movimentação realizada com sucesso." });

        } catch (error) {
            await t.rollback();
            console.error("Erro ao atualizar estoque", error);
            return res.status(500).send({ error: "Erro ao realizar movimentação. Por favor, tente novamente." });
        }

    }



}