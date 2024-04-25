const Robo = require('../models/Robo')
const Projeto = require('../models/Projeto')

module.exports = {

    async criarRobo(req, res){

        try {

            const {id_projeto} = req.params;
            const {id_robo, nome_robo, tipo_robo } = req.body;
    
            const projeto = await Projeto.findByPk(id_projeto)

            if(!projeto){
                res.status(400).send({error: 'Projeto não encontrado.'})
            }
            
    
            const robo = await Robo.create( {id_robo, id_projeto, nome_robo, tipo_robo });
    
            return res.send(robo);
            


        } catch (error) {
  
            console.error("Erro ao criar robô:", error);

            return res.status(500).send({ error: "Erro ao criar o robô. Por favor, tente novamente." });
        }
    },

    async listarRobos(req, res){
        try {
            const robos = await Robo.findAll();
            res.send(robos);
        } catch (error) {

            console.error("Erro ao listar robôs:", error);

            return res.status(500).send({ error: "Erro ao obter a lista de robôs. Por favor, tente novamente." });
        }

    },


    async deletarRobo(req, res) {
        const { id_robo } = req.params;

        try {
            const robo = await Robo.findByPk(id_robo);

            if (!robo) {
                return res.status(404).send({ error: "Robô não encontrado." });
            }

            await robo.destroy(); 

            return res.send({ message: "Robô deletado com sucesso." });

        } catch (error) {

            return res.status(500).send({ error: "Erro ao deletar o robô" });
        }
    },




}