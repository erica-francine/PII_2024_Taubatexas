const Estoque = require('../../src/models/Estoque');
const estoqueController = require('../../src/controllers/EstoqueController');

jest.mock('../../src/models/Estoque'); 

describe('Estoque Controller', () => {

    describe('criarEstoque', () => {
        it('deve criar um novo estoque e retornar o resultado', async () => {
            // Dados simulados para o estoque
            const req = {
                body: {
                    localizacao: 'A1',
                    quantidade: 100
                }
            };
            const res = {
                send: jest.fn(), 
                status: jest.fn().mockReturnThis()
            };

            // Simula a criação de estoque retornando o mesmo objeto
            Estoque.create.mockResolvedValue(req.body);

            await estoqueController.criarEstoque(req, res);

            expect(Estoque.create).toHaveBeenCalledWith(req.body); 
            expect(res.send).toHaveBeenCalledWith(req.body);
        });

        it('deve retornar um erro ao falhar ao criar estoque', async () => {
            const req = { body: { localizacao: 'A1', quantidade: 100 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula um erro na criação do estoque
            Estoque.create.mockRejectedValue(new Error('Erro de criação'));

            await estoqueController.criarEstoque(req, res);

            expect(res.status).toHaveBeenCalledWith(500); // Verifica se o status de erro foi retornado
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao criar o estoque. Por favor, tente novamente." });
        });
    });

    describe('listarEstoques', () => {
        it('deve retornar a lista de estoques', async () => {
            const req = {};
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            const estoques = [
                { localizacao: 'A1', quantidade: 100 },
                { localizacao: 'B2', quantidade: 200 }
            ];

            Estoque.findAll.mockResolvedValue(estoques);

            await estoqueController.listarEstoques(req, res);

            expect(Estoque.findAll).toHaveBeenCalled(); 
            expect(res.send).toHaveBeenCalledWith(estoques); // Verifica se o retorno foi a lista de estoques
        });

        it('deve retornar um erro ao falhar ao listar estoques', async () => {
            const req = {};
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula um erro ao listar estoques
            Estoque.findAll.mockRejectedValue(new Error('Erro de listagem'));

            await estoqueController.listarEstoques(req, res);

            expect(res.status).toHaveBeenCalledWith(500); // Verifica se o status de erro foi retornado
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao obter a lista de estoques. Por favor, tente novamente." });
        });
    });
});
