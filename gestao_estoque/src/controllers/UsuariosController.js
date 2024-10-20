const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validate = require('./Validate')
const cookieParser = require('cookie-parser')

module.exports = {

    async listarUsuarios(req, res){
        try {
            const usuarios = await Usuario.findAll({
                attributes: { exclude: ['senha_usuario'] } // Excluir a coluna senha
            });
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
        
        const {error} = validate.registerValidate(req.body)
        if(error){return res.status(400).send(error.message)}

        const usuarioSelecionado = await Usuario.findOne({
            where: { email_usuario: req.body.email_usuario } 
        });

            if(usuarioSelecionado) return res.status(400).send('Usuário já cadastrado com esse email')

            try {
                const usuario = await Usuario.create({ 
                    nome_usuario: req.body.nome_usuario,
                    email_usuario: req.body.email_usuario,
                    senha_usuario: bcrypt.hashSync(req.body.senha_usuario),
                    funcao_usuario: req.body.funcao_usuario
                });
                return res.send(usuario);
            } catch (error) {
    
                console.error("Erro ao registrar usuário:", error);

                return res.status(400).send({ error: "Erro ao registrar o usuário. Por favor, tente novamente." });
            }
    },



    async login(req,res){

        const {error} = validate.loginValidate(req.body)
        if(error){return res.status(400).send(error.message)}


        const usuarioSelecionado = await Usuario.findOne({
            where: { email_usuario: req.body.email_usuario } 
        });

        if(!usuarioSelecionado) return res.status(400).send('Email ou senha incorretos')

        const senhaUsuarioMatch = bcrypt.compareSync(req.body.senha_usuario, usuarioSelecionado.senha_usuario)

        if(!senhaUsuarioMatch) return res.status(400).send('Email ou senha incorretos')
        
        
        const token = jwt.sign({id_usuario:usuarioSelecionado.id_usuario,funcao_usuario: usuarioSelecionado.funcao_usuario}, process.env.TOKEN_SECRET, { expiresIn: '1h' })

        
        res.cookie('authorization-token', token, {
            httpOnly:true,
            // secure:true,
            maxAge: 3600000,
        });

        res.send('Usuario logado');
   },

   
}




