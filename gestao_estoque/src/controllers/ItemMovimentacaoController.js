const Material = require('../models/Material')
const Item_Movimentacao = require('../models/Item_Movimentacao')

module.exports = {

    async addItemMov(req, res){

        try {
            const { id_movimentacao} = req.params;
            const {id_material, qtde_material} = req.body;

            const material = await Material.findByPk(id_material)
                    
            if(!material){
                res.status(400).send({error: `Material não encontrado.` })
            }
            
            const item_movimentacao = await Item_Movimentacao.create({ id_movimentacao, id_material, qtde_material });
    
            return res.send(item_movimentacao);
            


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