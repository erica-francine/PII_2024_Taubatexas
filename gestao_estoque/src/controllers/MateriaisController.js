const Material = require('../models/Material')
const Categoria = require('../models/Categoria')
const Estoque = require('../models/Estoque')

module.exports = {

    async cadastrarMaterial(req, res){

        try {
            const { id_categoria, id_estoque, descricao_material, unid_medida_material, quantidade_material, status_material } = req.body;

              
            const estoque = await Estoque.findByPk(id_estoque)
            const categoria = await Categoria.findByPk(id_categoria)

            if(!estoque){
                res.status(400).send({error: `Estoque não encontrado.` })
            }

            if(!categoria){
                res.status(400).send({error: `Categoria não encontrada.` })
            }
            
            const material = await Material.create({ id_categoria, id_estoque, descricao_material, unid_medida_material, quantidade_material, status_material });
    
            return res.json(material);
            


        } catch (error) {
  
            console.error("Erro ao criar material:", error);

            return res.status(500).send({ error: "Erro ao criar material. Por favor, tente novamente." });
        }
        
    },

    async listarMateriais(req, res){
        try {

            const materiais = await Material.findAll({
                include: [{
                    model: Categoria, 
                    as: 'categoria', 
                    attributes: ['descricao_categoria', 'id_categoria'] 
                }]
            });


            // res.json(materiais);
            res.render('materiais', {materiais: materiais, tipo_movimentacao: req.params.tipo_movimentacao})

        } catch (error) {

            console.error("Erro ao listar materiais:", error);

            return res.status(500).send({ error: "Erro ao obter a lista materiais. Por favor, tente novamente." });
        }

    },


    async deletarMaterial(req, res) {
        const { id_material } = req.params;

        try {
            const material = await Material.findByPk(id_material);

            if (!material) {
                return res.status(404).send({ error: "Material não encontrado." });
            }

            await material.destroy(); 

            return res.send({ message: "Material deletado com sucesso." });

        } catch (error) {

            return res.status(500).send({ error: "Erro ao deletar material" });
        }
    },

    
    async inativarMaterial(req, res){
        const {id_material} = req.params;

        try {
            
            const material = await Material.findByPk(id_material);

            if (!material) {
                return res.status(404).send({ error: "Material não encontrado." });
            }

            material.status_material = false;

            await material.save();

            return res.send({ message: "Material foi inativado com sucesso." });

        } catch (error) {
            return res.status(500).send({ error: "Erro ao inativar o material" });
        }
    },

    async ativarMaterial(req, res){
        const {id_material} = req.params;

        try {
            
            const material = await Material.findByPk(id_material);

            if (!material) {
                return res.status(404).send({ error: "Material não encontrado." });
            }

            material.status_material = true;

            await material.save();

            return res.send({ message: "Material foi ativado com sucesso." });

        } catch (error) {
            return res.status(500).send({ error: "Erro ao ativar material" });
        }
    },

   
}