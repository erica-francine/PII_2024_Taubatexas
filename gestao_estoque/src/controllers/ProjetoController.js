const Projeto = require('../models/Projeto');

module.exports = {


    async criarProjeto(req, res){
        const { descricao_projeto, local_projeto, data_final_projeto  } = req.body;

        try {
            const projeto = await Projeto.create({ descricao_projeto, local_projeto, data_final_projeto });
            return res.send(projeto);
        } catch (error) {
  
            console.error("Erro ao criar projeto:", error);

            return res.status(500).send({ error: "Erro ao criar o projeto. Por favor, tente novamente." });
        }
    },


    async listarProjetos(req, res){
        try {
            const projetos = await Projeto.findAll();
            res.send(projetos);
        } catch (error) {

            console.error("Erro ao listar projetos:", error);

            return res.status(500).send({ error: "Erro ao obter a lista de projetos. Por favor, tente novamente." });
        }

    },
    

    async deletarProjeto(req, res) {
        const { id_projeto } = req.body;

        try {
            const projeto = await Projeto.findByPk(id_projeto);

            if (!projeto) {
                return res.status(404).send({ error: "Projeto não encontrado." });
            }

            await projeto.destroy(); 

            return res.send({ message: "Projeto deletado com sucesso." });

        } catch (error) {

            return res.status(500).send({ error: "Erro ao deletar o projeto" });
        }
    },

}