const Endereco = require('../models/Endereco_Fornecedor')
const Fornecedor = require('../models/Fornecedor')

module.exports = {

    async criarEndereco(req, res){

        try {

            const {id_fornecedor} = req.params;
            const {logradouro_endereco_fornecedor, 
                numero_endereco_fornecedor, 
                rua_endereco_fornecedor, 
                bairro_endereco_fornecedor, 
                complemento_endereco_fornecedor, 
                cidade_endereco_fornecedor, 
                estado_endereco_fornecedor, 
                cep_endereco_fornecedor} = req.body;
    
            const fornecedor = await Fornecedor.findByPk(id_fornecedor)

            if(!fornecedor){
                res.status(400).send({error: 'Fornecedor não encontrado.'})
            }
            
    
            const endereco = await Endereco.create( {id_fornecedor, 
                logradouro_endereco_fornecedor, 
                numero_endereco_fornecedor, 
                rua_endereco_fornecedor, 
                bairro_endereco_fornecedor, 
                complemento_endereco_fornecedor, 
                cidade_endereco_fornecedor, 
                estado_endereco_fornecedor,
                cep_endereco_fornecedor});
    
            return res.send(endereco);
            


        } catch (error) {
  
            console.error("Erro ao criar endereço:", error);

            return res.status(500).send({ error: "Erro ao criar o endereço. Por favor, tente novamente." });
        }
    },



    async deletarEndereco(req, res) {
        const { id_fornecedor } = req.params;

        try {
            const endereco = await Endereco.findByPk(id_fornecedor);

            if (!endereco) {
                return res.status(404).send({ error: "Endereço não encontrado." });
            }

            await endereco.destroy(); 

            return res.send({ message: "Endereço deletado com sucesso." });

        } catch (error) {

            return res.status(500).send({ error: "Erro ao deletar o endereço" });
        }
    },




}