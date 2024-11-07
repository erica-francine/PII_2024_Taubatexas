const projetoController = require('../../src/controllers/ProjetoController');
const Projeto = require('../../src/models/Projeto');

jest.mock('../../src/models/Projeto');

describe('ProjetoController', () => {
    let req, res;

    beforeEach(() => {
        req = {}; 
        res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    afterEach(() => {
        jest.clearAllMocks(); 
    });

    describe('criarProjeto', () => {
        it('deve criar um projeto com sucesso', async () => {
            req.body = { descricao_projeto: 'Projeto Teste', local_projeto: 'Local A', data_final_projeto: '2024-12-31' };

            const projetoMock = { id_projeto: 1, ...req.body };
            Projeto.create.mockResolvedValue(projetoMock); 

            await projetoController.criarProjeto(req, res);

            expect(res.send).toHaveBeenCalledWith(projetoMock);
            expect(Projeto.create).toHaveBeenCalledWith(req.body);
        });

        it('deve retornar erro ao tentar criar o projeto', async () => {
            req.body = { descricao_projeto: 'Projeto Teste', local_projeto: 'Local A', data_final_projeto: '2024-12-31' };

            Projeto.create.mockRejectedValue(new Error('Erro ao criar projeto'));

            await projetoController.criarProjeto(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                error: 'Erro ao criar o projeto. Por favor, tente novamente.'
            });
        });
    });

    describe('listarProjetos', () => {
        it('deve listar todos os projetos com sucesso', async () => {
            const projetosMock = [
                { id_projeto: 1, descricao_projeto: 'Projeto 1', local_projeto: 'Local A', data_final_projeto: '2024-12-31' },
                { id_projeto: 2, descricao_projeto: 'Projeto 2', local_projeto: 'Local B', data_final_projeto: '2024-12-15' }
            ];

            Projeto.findAll.mockResolvedValue(projetosMock); 

            await projetoController.listarProjetos(req, res);

            expect(res.send).toHaveBeenCalledWith(projetosMock);
            expect(Projeto.findAll).toHaveBeenCalled();
        });

        it('deve retornar erro ao listar projetos', async () => {
            Projeto.findAll.mockRejectedValue(new Error('Erro ao listar projetos'));

            await projetoController.listarProjetos(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                error: 'Erro ao obter a lista de projetos. Por favor, tente novamente.'
            });
        });
    });

    describe('deletarProjeto', () => {
        it('deve deletar o projeto com sucesso', async () => {
            req.body = { id_projeto: 1 };

            const projetoMock = { id_projeto: 1, descricao_projeto: 'Projeto Teste', destroy: jest.fn() };
            Projeto.findByPk.mockResolvedValue(projetoMock); 

            await projetoController.deletarProjeto(req, res);

            expect(projetoMock.destroy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith({ message: 'Projeto deletado com sucesso.' });
        });

        it('deve retornar erro se o projeto não for encontrado', async () => {
            req.body = { id_projeto: 1 };

            Projeto.findByPk.mockResolvedValue(null);

            await projetoController.deletarProjeto(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ error: 'Projeto não encontrado.' });
        });

        it('deve retornar erro ao tentar deletar o projeto', async () => {
            req.body = { id_projeto: 1 };

            const projetoMock = { id_projeto: 1, descricao_projeto: 'Projeto Teste', destroy: jest.fn() };
            Projeto.findByPk.mockResolvedValue(projetoMock);
            projetoMock.destroy.mockRejectedValue(new Error('Erro ao deletar projeto'));

            await projetoController.deletarProjeto(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao deletar o projeto' });
        });
    });
});
