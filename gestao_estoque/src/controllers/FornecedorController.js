const Fornecedor = require('../models/Fornecedor')

module.exports = {

    async criarFornecedor(req, res){
        const { nome_fornecedor, cnpj_fornecedor, telefone_fornecedor } = req.body;

        try {
            const fornecedor = await Fornecedor.create({ nome_fornecedor, cnpj_fornecedor, telefone_fornecedor });
            return res.send(fornecedor);
        } catch (error) {
  
            console.error("Erro ao criar fornecedor:", error);

            return res.status(500).send({ error: "Erro ao criar o fornecedor. Por favor, tente novamente." });
        }
    },


    async listarFornecedores(req, res){
        try {
            const fornecedores = await Fornecedor.findAll();
            res.send(fornecedores);
        } catch (error) {

            console.error("Erro ao listar fornecedores:", error);

            return res.status(500).send({ error: "Erro ao obter a lista de fornecedores. Por favor, tente novamente." });
        }

    },
    
    async inativarFornecedor(req, res){
        const {id_fornecedor} = req.body;

        try {
            
            const fornecedor = await Fornecedor.findByPk(id_fornecedor);

            if (!fornecedor) {
                return res.status(404).send({ error: "Fornecedor não encontrado." });
            }

            fornecedor.status_fornecedor = false;

            await fornecedor.save();

            return res.send({ message: "Fornecedor foi inativado com sucesso." });

        } catch (error) {
            return res.status(500).send({ error: "Erro ao inativar o fornecedor" });
        }
    },

    async ativarFornecedor(req, res){
        const {id_fornecedor} = req.body;

        try {
            
            const fornecedor = await Fornecedor.findByPk(id_fornecedor);

            if (!fornecedor) {
                return res.status(404).send({ error: "Fornecedor não encontrado." });
            }

            fornecedor.status_fornecedor = true;

            await fornecedor.save();

            return res.send({ message: "Fornecedor foi ativado com sucesso." });

        } catch (error) {
            return res.status(500).send({ error: "Erro ao ativar o fornecedor" });
        }
    },


    async deletarFornecedor(req, res) {
        const { id_fornecedor } = req.body;

        try {
            const fornecedor = await Fornecedor.findByPk(id_fornecedor);

            if (!fornecedor) {
                return res.status(404).send({ error: "Fornecedor não encontrado." });
            }

            await fornecedor.destroy(); 

            return res.send({ message: "Fornecedor deletado com sucesso." });

        } catch (error) {

            return res.status(500).send({ error: "Erro ao deletar o fornecedor" });
        }
    },




}




