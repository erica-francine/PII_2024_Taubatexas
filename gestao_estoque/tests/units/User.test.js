const request = require('supertest');
const bcrypt = require('bcryptjs'); 
const Usuario = require('../../src/models/Usuario');
const userController = require('../../src/controllers/UsuariosController');
const express = require('express');
const app = express();
app.use(express.json());


jest.mock('../../src/models/Usuario'); // Mocka o modelo Usuario
jest.mock('bcryptjs');

describe('User Controller', () => {
    beforeAll(() => {
        process.env.TOKEN_SECRET = 'sjhdiuajhliueb'; // Defina um valor fictício para o TOKEN_SECRET
    });

    beforeEach(() => {
        jest.clearAllMocks(); // Limpa os mocks antes de cada teste
    });



    it('registra novo usuário', async () => {
        const req = {
            body: {
                nome_usuario: 'Usuario Teste',
                email_usuario: 'teste@exemplo.com',
                senha_usuario: 'senha123',
                funcao_usuario: 'operador'
            }
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Mock do bcrypt para garantir que ele retorne uma senha criptografada
        const hashedPassword = 'senhaHashed'; // Simulação da senha criptografada
        jest.spyOn(bcrypt, 'hashSync').mockReturnValue(hashedPassword); // Mocka a função hashSync

        await userController.register(req, res);

        expect(Usuario.create).toHaveBeenCalledWith({
            nome_usuario: req.body.nome_usuario,
            email_usuario: req.body.email_usuario,
            senha_usuario: hashedPassword, // Verifica se a senha é a senha criptografada
            funcao_usuario: req.body.funcao_usuario
        });
    });

    it('faz login de um usuário com sucesso', async () => {
        const req = {
            body: {
                email_usuario: 'teste@exemplo.com',
                senha_usuario: 'senha123',
            }
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
            cookie: jest.fn() // Mocka o método cookie
        };

        const mockUser = {
            id_usuario: 1,
            funcao_usuario: 'operador',
            senha_usuario: 'senhaHashed', // Senha que será verificada
        };

        // Mock do retorno do findOne para retornar um usuário fictício
        Usuario.findOne.mockResolvedValue(mockUser);
        // Mock do bcrypt para verificar a senha corretamente
        jest.spyOn(bcrypt, 'compareSync').mockReturnValue(true); // Simula que a senha está correta

        await userController.login(req, res);

        expect(bcrypt.compareSync).toHaveBeenCalledWith(req.body.senha_usuario, mockUser.senha_usuario);
        expect(res.cookie).toHaveBeenCalled(); // Verifica se o cookie foi setado
        expect(res.send).toHaveBeenCalledWith('Usuario logado'); // Verifica se a resposta está correta
    });

    it('retorna erro ao fazer login com senha incorreta', async () => {
        const req = {
            body: {
                email_usuario: 'teste@exemplo.com',
                senha_usuario: 'senhaErrada',
            }
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        const mockUser = {
            id_usuario: 1,
            funcao_usuario: 'operador',
            senha_usuario: 'senhaHashed', // Simulação de senha criptografada
        };

        // Mock do retorno do findOne para retornar um usuário fictício
        Usuario.findOne.mockResolvedValue(mockUser);
        // Mock do bcrypt para simular senha incorreta
        jest.spyOn(bcrypt, 'compareSync').mockReturnValue(false); // Simula que a senha está incorreta

        await userController.login(req, res);

        expect(res.status).toHaveBeenCalledWith(400); // Verifica se o status 400 foi chamado
        expect(res.send).toHaveBeenCalledWith('Email ou senha incorretos'); // Verifica a mensagem de erro
    });


    it('lista todos os usuários com sucesso', async () => {
        const req = {};
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        const mockUsers = [
            { id_usuario: 1, nome_usuario: 'Usuario 1', email_usuario: 'usuario1@exemplo.com' },
            { id_usuario: 2, nome_usuario: 'Usuario 2', email_usuario: 'usuario2@exemplo.com' }
        ];

        // Mock do retorno do findAll
        Usuario.findAll.mockResolvedValue(mockUsers);

        await userController.listarUsuarios(req, res);

        expect(res.send).toHaveBeenCalledWith(mockUsers); // Verifica se a resposta contém os usuários
    });


    it('retorna erro ao listar usuários', async () => {
        const req = {};
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Mock do findAll para lançar um erro
        Usuario.findAll.mockRejectedValue(new Error('Erro ao obter usuários'));

        await userController.listarUsuarios(req, res);

        expect(res.status).toHaveBeenCalledWith(500); // Verifica se o status 500 foi chamado
        expect(res.send).toHaveBeenCalledWith({ error: "Erro ao obter a lista de usuários. Por favor, tente novamente." }); // Verifica a mensagem de erro
    });

    it('inativa um usuário com sucesso', async () => {
        const req = {
            body: { id_usuario: 1 }
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        const mockUser = {
            id_usuario: 1,
            status_usuario: true,
            save: jest.fn() // Mocka a função save
        };

        // Mock do findByPk para retornar um usuário fictício
        Usuario.findByPk.mockResolvedValue(mockUser);

        await userController.inativarUsuario(req, res);

        expect(mockUser.status_usuario).toBe(false); // Verifica se o status foi alterado
        expect(mockUser.save).toHaveBeenCalled(); // Verifica se save foi chamado
        expect(res.send).toHaveBeenCalledWith({ message: "Usuário foi inativado com sucesso." }); // Verifica a mensagem de sucesso
    });
    

    it('retorna erro ao inativar um usuário que não existe', async () => {
        const req = {
            body: { id_usuario: 999 } // ID de usuário que não existe
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Mock do findByPk para retornar null
        Usuario.findByPk.mockResolvedValue(null);

        await userController.inativarUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(404); // Verifica se o status 404 foi chamado
        expect(res.send).toHaveBeenCalledWith({ error: "Usuário não encontrado." }); // Verifica a mensagem de erro
    });

    it('retorna erro ao inativar um usuário devido a um erro de banco de dados', async () => {
        const req = {
            body: { id_usuario: 1 }
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        const mockUser = {
            id_usuario: 1,
            status_usuario: true,
            save: jest.fn().mockRejectedValue(new Error('Erro ao salvar')) // Mocka um erro ao salvar
        };

        // Mock do findByPk para retornar um usuário fictício
        Usuario.findByPk.mockResolvedValue(mockUser);

        await userController.inativarUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(500); // Verifica se o status 500 foi chamado
        expect(res.send).toHaveBeenCalledWith({ error: "Erro ao inativar o usuário" }); // Verifica a mensagem de erro
    });


    it('ativa um usuário com sucesso', async () => {
        const req = {
            body: { id_usuario: 1 }
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        const mockUser = {
            id_usuario: 1,
            status_usuario: false,
            save: jest.fn() // Mocka a função save
        };

        // Mock do findByPk para retornar um usuário fictício
        Usuario.findByPk.mockResolvedValue(mockUser);

        await userController.ativarUsuario(req, res);

        expect(mockUser.status_usuario).toBe(true); // Verifica se o status foi alterado
        expect(mockUser.save).toHaveBeenCalled(); // Verifica se save foi chamado
        expect(res.send).toHaveBeenCalledWith({ message: "Usuário foi ativado com sucesso." }); // Verifica a mensagem de sucesso
    });


    it('retorna erro ao ativar um usuário que não existe', async () => {
        const req = {
            body: { id_usuario: 999 } // ID de usuário que não existe
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Mock do findByPk para retornar null
        Usuario.findByPk.mockResolvedValue(null);

        await userController.ativarUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(404); // Verifica se o status 404 foi chamado
        expect(res.send).toHaveBeenCalledWith({ error: "Usuário não encontrado." }); // Verifica a mensagem de erro
    });


    it('retorna erro ao ativar um usuário devido a um erro de banco de dados', async () => {
        const req = {
            body: { id_usuario: 1 }
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        const mockUser = {
            id_usuario: 1,
            status_usuario: false,
            save: jest.fn().mockRejectedValue(new Error('Erro ao salvar')) // Mocka um erro ao salvar
        };

        // Mock do findByPk para retornar um usuário fictício
        Usuario.findByPk.mockResolvedValue(mockUser);

        await userController.ativarUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(500); // Verifica se o status 500 foi chamado
        expect(res.send).toHaveBeenCalledWith({ error: "Erro ao ativar o usuário" }); // Verifica a mensagem de erro
    });


    it('deleta um usuário com sucesso', async () => {
        const req = {
            body: { id_usuario: 1 }
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        const mockUser = {
            id_usuario: 1,
            destroy: jest.fn() // Mocka a função destroy
        };

        // Mock do findByPk para retornar um usuário fictício
        Usuario.findByPk.mockResolvedValue(mockUser);

        await userController.deletarUsuario(req, res);

        expect(mockUser.destroy).toHaveBeenCalled(); // Verifica se destroy foi chamado
        expect(res.send).toHaveBeenCalledWith({ message: "Usuário deletado com sucesso." }); // Verifica a mensagem de sucesso
    });


    it('retorna erro ao deletar um usuário que não existe', async () => {
        const req = {
            body: { id_usuario: 999 } // ID de usuário que não existe
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        // Mock do findByPk para retornar null
        Usuario.findByPk.mockResolvedValue(null);

        await userController.deletarUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(404); // Verifica se o status 404 foi chamado
        expect(res.send).toHaveBeenCalledWith({ error: "Usuário não encontrado." }); // Verifica a mensagem de erro
    });


    it('retorna erro ao deletar um usuário devido a um erro de banco de dados', async () => {
        const req = {
            body: { id_usuario: 1 }
        };
        const res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };

        const mockUser = {
            id_usuario: 1,
            destroy: jest.fn().mockRejectedValue(new Error('Erro ao deletar')) // Mocka um erro ao deletar
        };

        // Mock do findByPk para retornar um usuário fictício
        Usuario.findByPk.mockResolvedValue(mockUser);

        await userController.deletarUsuario(req, res);

        expect(res.status).toHaveBeenCalledWith(500); // Verifica se o status 500 foi chamado
        expect(res.send).toHaveBeenCalledWith({ error: "Erro ao deletar o usuário" }); // Verifica a mensagem de erro
    });



});
