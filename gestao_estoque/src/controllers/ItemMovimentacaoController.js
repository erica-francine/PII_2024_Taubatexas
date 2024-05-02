const Material = require('../models/Material')
const Item_Movimentacao = require('../models/Item_Movimentacao')


module.exports = {

    async addItemMov(req, res, next){

        try {
            const { id_movimentacao} = req.body;
            const {itens_movimentacao} = req.body



            if (!itens_movimentacao || itens_movimentacao.length === 0) {
                return res.status(400).send({ error: "Nenhum item para movimentação foi fornecido." });
            }
    
            const resultados = []

            for (const item of itens_movimentacao) {
                const material = await Material.findByPk(item.id_material);
                
                if (!material) {

                    return res.status(404).send({ error: `Material não encontrado para o ID: ${item.id_material}. Processo interrompido.` });
    
                }
                
                const itemMovimentacao = await Item_Movimentacao.create({
                    id_movimentacao, // Usando o mesmo ID de movimentação para todos os itens
                    id_material: item.id_material,
                    quantidade_material: item.quantidade_material
                });
    
                resultados.push(itemMovimentacao); // Armazena o resultado para resposta final
            }
    
            if (resultados.length === 0) {
                return res.status(404).send({ error: "Nenhum material válido encontrado para os IDs fornecidos." });
            }
    
            res.status(200).send(resultados); // Envia todos os itens de movimentação criados

            res.redirect('/movimentacoes')

            next()

            


        } catch (error) {
  
            console.error("Erro ao adicionar item na movimentação", error);

            return res.status(500).send({ error: "Erro ao adicionar item na movimentação. Por favor, tente novamente." });
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