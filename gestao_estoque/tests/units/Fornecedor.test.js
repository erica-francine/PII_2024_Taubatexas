const Fornecedor = require('../../src/models/Fornecedor');
const fornecedorController = require('../../src/controllers/FornecedorController');

jest.mock('../../src/models/Fornecedor'); 

describe('Fornecedor Controller', () => {

    describe('criarFornecedor', () => {
        it('deve criar um novo fornecedor e retornar o fornecedor criado', async () => {
            const req = {
                body: {
                    nome_fornecedor: 'Fornecedor Teste',
                    cnpj_fornecedor: '12345678000195',
                    telefone_fornecedor: '11987654321'
                }
            };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            Fornecedor.create.mockResolvedValue(req.body);

            await fornecedorController.criarFornecedor(req, res);

            expect(Fornecedor.create).toHaveBeenCalledWith(req.body); 
            expect(res.send).toHaveBeenCalledWith(req.body); // Verifica se o fornecedor criado foi retornado na resposta
        });

        it('deve retornar um erro ao criar fornecedor', async () => {
            const req = { body: { nome_fornecedor: 'Fornecedor Teste' } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula um erro na criação do fornecedor
            Fornecedor.create.mockRejectedValue(new Error('Erro de criação'));

            await fornecedorController.criarFornecedor(req, res);

            expect(res.status).toHaveBeenCalledWith(500); 
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao criar o fornecedor. Por favor, tente novamente." });
        });
    });

    describe('listarFornecedores', () => {
        it('deve retornar a lista de fornecedores', async () => {
            const req = {};
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            const fornecedores = [
                { nome_fornecedor: 'Fornecedor 1', cnpj_fornecedor: '12345678000191' },
                { nome_fornecedor: 'Fornecedor 2', cnpj_fornecedor: '12345678000192' }
            ];

            Fornecedor.findAll.mockResolvedValue(fornecedores);

            await fornecedorController.listarFornecedores(req, res);

            expect(Fornecedor.findAll).toHaveBeenCalled(); 
            expect(res.send).toHaveBeenCalledWith(fornecedores); // Verifica se a lista de fornecedores foi retornada
        });

        it('deve retornar um erro ao listar fornecedores', async () => {
            const req = {};
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            Fornecedor.findAll.mockRejectedValue(new Error('Erro de listagem'));

            await fornecedorController.listarFornecedores(req, res);

            expect(res.status).toHaveBeenCalledWith(500); 
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao obter a lista de fornecedores. Por favor, tente novamente." });
        });
    });

    describe('inativarFornecedor', () => {
        it('deve inativar um fornecedor e retornar sucesso', async () => {
            const req = { body: { id_fornecedor: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            const fornecedor = { id_fornecedor: 1, status_fornecedor: true, save: jest.fn() };

            Fornecedor.findByPk.mockResolvedValue(fornecedor);

            await fornecedorController.inativarFornecedor(req, res);

            expect(fornecedor.save).toHaveBeenCalled(); 
            expect(res.send).toHaveBeenCalledWith({ message: "Fornecedor foi inativado com sucesso." }); // Verifica a resposta de sucesso
        });

        it('deve retornar um erro 404 se o fornecedor não for encontrado', async () => {
            const req = { body: { id_fornecedor: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            Fornecedor.findByPk.mockResolvedValue(null);

            await fornecedorController.inativarFornecedor(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ error: "Fornecedor não encontrado." });
        });

        it('deve retornar erro na inativação', async () => {
            const req = { body: { id_fornecedor: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula um erro ao tentar salvar a inativação
            Fornecedor.findByPk.mockResolvedValue({ id_fornecedor: 1, save: jest.fn().mockRejectedValue(new Error('Erro')) });

            await fornecedorController.inativarFornecedor(req, res);

            expect(res.status).toHaveBeenCalledWith(500); 
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao inativar o fornecedor" }); 
        });
    });

    describe('ativarFornecedor', () => {
        it('deve ativar um fornecedor e retornar sucesso', async () => {
            const req = { body: { id_fornecedor: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            const fornecedor = { id_fornecedor: 1, status_fornecedor: false, save: jest.fn() };

            Fornecedor.findByPk.mockResolvedValue(fornecedor);

            await fornecedorController.ativarFornecedor(req, res);

            expect(fornecedor.save).toHaveBeenCalled(); 
            expect(res.send).toHaveBeenCalledWith({ message: "Fornecedor foi ativado com sucesso." });
        });

        it('deve retornar erro 404 se o fornecedor não for encontrado', async () => {
            const req = { body: { id_fornecedor: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            Fornecedor.findByPk.mockResolvedValue(null);

            await fornecedorController.ativarFornecedor(req, res);

            expect(res.status).toHaveBeenCalledWith(404); 
            expect(res.send).toHaveBeenCalledWith({ error: "Fornecedor não encontrado." });
        });

        it('deve retornar erro na ativação', async () => {
            const req = { body: { id_fornecedor: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            Fornecedor.findByPk.mockResolvedValue({ id_fornecedor: 1, save: jest.fn().mockRejectedValue(new Error('Erro')) });

            await fornecedorController.ativarFornecedor(req, res);

            expect(res.status).toHaveBeenCalledWith(500); 
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao ativar o fornecedor" }); 
        });
    });

    describe('deletarFornecedor', () => {
        it('deve deletar um fornecedor e retornar sucesso', async () => {
            const req = { body: { id_fornecedor: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            const fornecedor = { id_fornecedor: 1, destroy: jest.fn() };

            Fornecedor.findByPk.mockResolvedValue(fornecedor);

            await fornecedorController.deletarFornecedor(req, res);

            expect(fornecedor.destroy).toHaveBeenCalled(); 
            expect(res.send).toHaveBeenCalledWith({ message: "Fornecedor deletado com sucesso." }); 
        });

        it('deve retornar erro 404 se o fornecedor não for encontrado', async () => {
            const req = { body: { id_fornecedor: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            Fornecedor.findByPk.mockResolvedValue(null);

            await fornecedorController.deletarFornecedor(req, res);

            expect(res.status).toHaveBeenCalledWith(404); 
            expect(res.send).toHaveBeenCalledWith({ error: "Fornecedor não encontrado." }); 
        });

        it('deve retornar erro ao deletar fornecedor', async () => {
            const req = { body: { id_fornecedor: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            Fornecedor.findByPk.mockResolvedValue({ id_fornecedor: 1, destroy: jest.fn().mockRejectedValue(new Error('Erro')) });

            await fornecedorController.deletarFornecedor(req, res);

            expect(res.status).toHaveBeenCalledWith(500); 
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao deletar o fornecedor" }); 
        });
    });

});
