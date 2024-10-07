const Usuario = require('../models/Usuario');

module.exports = {

    async criarUsuario(req, res){
        const { nome_usuario, funcao_usuario } = req.body;

        try {
            const usuario = await Usuario.create({ nome_usuario, funcao_usuario });
            return res.send(usuario);
        } catch (error) {
  
            console.error("Erro ao criar usuário:", error);

            return res.status(500).send({ error: "Erro ao criar o usuário. Por favor, tente novamente." });
        }
    },


    async listarUsuarios(req, res){
        try {
            const usuarios = await Usuario.findAll();
            res.send(usuarios);
        } catch (error) {

            console.error("Erro ao listar usuários:", error);

            return res.status(500).send({ error: "Erro ao obter a lista de usuários. Por favor, tente novamente." });
        }

    },
    
    async inativarUsuario(req, res){
        const {id_usuario} = req.body;

        try {
            
            const usuario = await Usuario.findByPk(id_usuario);

            if (!usuario) {
                return res.status(404).send({ error: "Usuário não encontrado." });
            }

            usuario.status_usuario = false;

            await usuario.save();

            return res.send({ message: "Usuário foi inativado com sucesso." });

        } catch (error) {
            return res.status(500).send({ error: "Erro ao inativar o usuário" });
        }
    },

    async ativarUsuario(req, res){
        const {id_usuario} = req.body;

        try {
            
            const usuario = await Usuario.findByPk(id_usuario);

            if (!usuario) {
                return res.status(404).send({ error: "Usuário não encontrado." });
            }

            usuario.status_usuario = true;

            await usuario.save();

            return res.send({ message: "Usuário foi ativado com sucesso." });

        } catch (error) {
            return res.status(500).send({ error: "Erro ao ativar o usuário" });
        }
    },


    async deletarUsuario(req, res) {
        const { id_usuario } = req.body;

        try {
            const usuario = await Usuario.findByPk(id_usuario);

            if (!usuario) {
                return res.status(404).send({ error: "Usuário não encontrado." });
            }

            await usuario.destroy(); 

            return res.send({ message: "Usuário deletado com sucesso." });

        } catch (error) {

            return res.status(500).send({ error: "Erro ao deletar o usuário" });
        }
    },

   async register(req,res){
        console.log('registered')
        res.send('Registered')
   },
   async login(req,res){
        console.log('logged in')
        res.send('Logged in')
   }

}




