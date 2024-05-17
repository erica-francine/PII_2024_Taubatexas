const Material = require('../models/Material')
const Item_Movimentacao = require('../models/Item_Movimentacao')


module.exports = {

    async addItemMov(req, res, next){
        const t = req.transaction; 

        try {
            const id_movimentacao = req.id_movimentacao;
            const {itens_movimentacao} = req.body



            if (!itens_movimentacao || itens_movimentacao.length === 0) {
                
                throw new Error("Nenhum item foi fornecido para movimentação");
            }
    
            const resultados = []

            for (const item of itens_movimentacao) {
                const material = await Material.findByPk(item.id_material, { transaction: t });
                
                if (!material) {

                    throw new Error(`Material não encontrado para Código: ${item.id_material}`);
    
                }

                const itemMovimentacao = await Item_Movimentacao.create({
                    id_movimentacao,
                    id_material: item.id_material,
                    quantidade_material: item.quantidade_material,
                    valor_unit: item.valor_unit,
                    valor_total: item.valor_total

                }, { transaction: t });
    
                resultados.push(itemMovimentacao); // Armazena o resultado para resposta final
            }

            
    
            if (resultados.length === 0) {

                throw new Error(`Nenhum material válido encontrado para os Códigos fornecidos}`);
  
            }
    




            next()

            


        } catch (error) {
  
            await t.rollback();

            console.error("Erro ao adicionar item na movimentação", error);

            return res.status(500).send({ error: "Erro ao realizar movimentação. Por favor, tente novamente." });
        }
        
       
    },

    async listarItensMov(req, res){
        try {
            const itens_movimentacoes = await Item_Movimentacao.findAll();
            res.send(itens_movimentacoes);
        } catch (error) {

            console.error("Erro ao listar itens da movimentação:", error);

            return res.status(500).send({ error: "Erro ao obter a lista de itens da movimentação. Por favor, tente novamente." });
        }

    },


    async deletaItemMov(req, res) {
        const { id_item_mov } = req.params;

        try {
            const item_movimentacao = await Item_Movimentacao.findByPk(id_item_mov);

            if (!item_movimentacao) {
                return res.status(404).send({ error: "Item não encontrado." });
            }

            await item_movimentacao.destroy(); 

            return res.send({ message: "Item deletado com sucesso." });

        } catch (error) {

            return res.status(500).send({ error: "Erro ao deletar item da movimentação" });
        }
    },


   
}