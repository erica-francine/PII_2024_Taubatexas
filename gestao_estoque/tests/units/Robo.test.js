const roboController = require('../../src/controllers/RoboController');
const Robo = require('../../src/models/Robo');
const Projeto = require('../../src/models/Projeto');

jest.mock('../../src/models/Robo');
jest.mock('../../src/models/Projeto');

describe('RoboController', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            send: jest.fn(),
            status: jest.fn().mockReturnThis()
        };
    });

    // afterEach(() => {
    //     jest.clearAllMocks();
    // });

    describe('criarRobo', () => {
        it('deve criar um robô com sucesso', async () => {
            req.params = { id_projeto: 1 };
            req.body = { nome_robo: 'Robo Teste', tipo_robo: 'Tipo A' };

            const projetoMock = { id_projeto: 1 };
            const roboMock = { id_projeto: 1, nome_robo: 'Robo Teste', tipo_robo: 'Tipo A' };

            Projeto.findByPk.mockResolvedValue(projetoMock);
            Robo.create.mockResolvedValue(roboMock);

            await roboController.criarRobo(req, res);

            expect(Projeto.findByPk).toHaveBeenCalledWith(1);
            expect(Robo.create).toHaveBeenCalledWith({
                id_projeto: 1,
                nome_robo: 'Robo Teste',
                tipo_robo: 'Tipo A'
            });
            expect(res.send).toHaveBeenCalledWith(roboMock);
        });

        it('deve retornar erro se o projeto não for encontrado', async () => {
            req.params = { id_projeto: 1 };
            req.body = { nome_robo: 'Robo Teste', tipo_robo: 'Tipo A' };

            Projeto.findByPk.mockResolvedValue(null);

            await roboController.criarRobo(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ error: 'Projeto não encontrado.' });
        });

        it('deve retornar erro ao tentar criar o robô', async () => {
            req.params = { id_projeto: 1 };
            req.body = { nome_robo: 'Robo Teste', tipo_robo: 'Tipo A' };

            Projeto.findByPk.mockRejectedValue(new Error('Erro ao criar robô'));

            await roboController.criarRobo(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                error: 'Erro ao criar o robô. Por favor, tente novamente.'
            });
        });
    });

    describe('listarRobos', () => {
        it('deve listar todos os robôs com sucesso', async () => {
            const robosMock = [
                { id_robo: 1, nome_robo: 'Robo 1', tipo_robo: 'Tipo A' },
                { id_robo: 2, nome_robo: 'Robo 2', tipo_robo: 'Tipo B' }
            ];

            Robo.findAll.mockResolvedValue(robosMock);

            await roboController.listarRobos(req, res);

            expect(res.send).toHaveBeenCalledWith(robosMock);
            expect(Robo.findAll).toHaveBeenCalled();
        });

        it('deve retornar erro ao listar robôs', async () => {
            Robo.findAll.mockRejectedValue(new Error('Erro ao listar robôs'));

            await roboController.listarRobos(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({
                error: 'Erro ao obter a lista de robôs. Por favor, tente novamente.'
            });
        });
    });

    describe('deletarRobo', () => {
        it('deve deletar o robô com sucesso', async () => {
            req.params = { id_robo: 1 };

            const roboMock = { id_robo: 1, destroy: jest.fn() };

            Robo.findByPk.mockResolvedValue(roboMock);

            await roboController.deletarRobo(req, res);

            expect(roboMock.destroy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith({ message: 'Robô deletado com sucesso.' });
        });

        it('deve retornar erro se o robô não for encontrado', async () => {
            req.params = { id_robo: 1 };

            Robo.findByPk.mockResolvedValue(null);

            await roboController.deletarRobo(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ error: 'Robô não encontrado.' });
        });

        it('deve retornar erro ao tentar deletar o robô', async () => {
            req.params = { id_robo: 1 };

            const roboMock = { id_robo: 1, destroy: jest.fn() };
            Robo.findByPk.mockResolvedValue(roboMock);
            roboMock.destroy.mockRejectedValue(new Error('Erro ao deletar robô'));

            await roboController.deletarRobo(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao deletar o robô' });
        });
    });
});
