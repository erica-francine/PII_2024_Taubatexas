const Categoria = require('../../src/models/Categoria');
const categoriaController = require('../../src/controllers/CategoriaController');

jest.mock('../../src/models/Categoria'); 

describe('Categoria Controller', () => {

    describe('criarCategoria', () => {
        it('deve criar uma nova categoria e retornar o resultado', async () => {
            const req = {
                body: {
                    descricao: 'Categoria Teste'
                }
            };
            const res = {
                send: jest.fn(), 
                status: jest.fn().mockReturnThis() 
            };

            // Simula a criação da categoria retornando o mesmo objeto
            Categoria.create.mockResolvedValue(req.body);

            await categoriaController.criarCategoria(req, res);

            expect(Categoria.create).toHaveBeenCalledWith(req.body); // Verifica se o método foi chamado com os dados corretos
            expect(res.send).toHaveBeenCalledWith(req.body); // Verifica se a resposta foi chamada com a categoria criada
        });

        it('deve retornar um erro ao criar categoria', async () => {
            const req = { body: { descricao: 'Categoria Teste' } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula um erro na criação da categoria
            Categoria.create.mockRejectedValue(new Error('Erro de criação'));

            await categoriaController.criarCategoria(req, res);

            expect(res.status).toHaveBeenCalledWith(500); // Verifica se o status de erro foi retornado
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao criar a categoria. Por favor, tente novamente." });
        });
    });

    describe('listarCategorias', () => {
        it('deve retornar a lista de categorias', async () => {
            const req = {};
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            const categorias = [
                { descricao: 'Categoria 1' },
                { descricao: 'Categoria 2' }
            ];

            Categoria.findAll.mockResolvedValue(categorias);

            await categoriaController.listarCategorias(req, res);

            expect(Categoria.findAll).toHaveBeenCalled(); 
            expect(res.send).toHaveBeenCalledWith(categorias); // Verifica se o retorno foi a lista de categorias
        });

        it('deve retornar um erro ao listar categorias', async () => {
            const req = {}; 
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula um erro ao listar categorias
            Categoria.findAll.mockRejectedValue(new Error('Erro de listagem'));

            await categoriaController.listarCategorias(req, res);

            expect(res.status).toHaveBeenCalledWith(500); // Verifica se o status de erro foi retornado
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao obter a lista de categorias. Por favor, tente novamente." });
        });
    });
});
