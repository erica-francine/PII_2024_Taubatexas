const MovimentacaoController = require('../../src/controllers/MovimentacaoController');
const Fornecedor = require('../../src/models/Fornecedor');
const Usuario = require('../../src/models/Usuario');
const Robo = require('../../src/models/Robo');
const Mov = require('../../src/models/Movimentacao');
const Material = require('../../src/models/Material');
const connection  = require('../../src/database/index');

jest.mock('../../src/models/Fornecedor');
jest.mock('../../src/models/Usuario');
jest.mock('../../src/models/Robo');
jest.mock('../../src/models/Movimentacao');
jest.mock('../../src/models/Material');
jest.mock('../../src/database/index', () => ({
    transaction: jest.fn().mockResolvedValue({ commit: jest.fn(), rollback: jest.fn() }), 
}));


describe('MovimentacaoController', () => {
    let req, res, next, t;

    beforeEach(() => {
        t = { commit: jest.fn(), rollback: jest.fn() };
        req = {
            params: { tipo_movimentacao: 'entrada' },
            body: {
                id_fornecedor: 1,
                id_usuario: 1,
                id_robo: 1,
                data_movimentacao: '2024-11-07',
                nf: '12345',
                itens_movimentacao: [{ id_material: 1, quantidade_material: 50 }],
            },
            transaction: t,
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        next = jest.fn();

        jest.clearAllMocks();
    });

    describe('realizarMov', () => {
        it('deve criar uma movimentação de entrada com sucesso', async () => {
            Fornecedor.findByPk.mockResolvedValue({ id_fornecedor: 1 });
            Mov.create.mockResolvedValue({ id_movimentacao: 1 });
            
            await MovimentacaoController.realizarMov(req, res, next);

            expect(Fornecedor.findByPk).toHaveBeenCalledWith(1, { transaction: t });
            expect(Mov.create).toHaveBeenCalledWith(
                { id_fornecedor: 1, data_movimentacao: '2024-11-07', tipo_movimentacao: 'entrada', nf: '12345' },
                { transaction: t }
            );
            expect(req.id_movimentacao).toBe(1);
            expect(next).toHaveBeenCalled();
        });

        it('deve retornar erro se fornecedor não for encontrado', async () => {
            Fornecedor.findByPk.mockResolvedValue(null);

            await MovimentacaoController.realizarMov(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao realizar movimentação. Por favor, tente novamente.' });
            expect(t.rollback).toHaveBeenCalled();
        });

        it('deve criar uma movimentação de saída com sucesso', async () => {
            req.params.tipo_movimentacao = 'saida';
            Usuario.findByPk.mockResolvedValue({ id_usuario: 1 });
            Robo.findByPk.mockResolvedValue({ id_robo: 1 });
            Mov.create.mockResolvedValue({ id_movimentacao: 2 });

            await MovimentacaoController.realizarMov(req, res, next);

            expect(Usuario.findByPk).toHaveBeenCalledWith(1, { transaction: t });
            expect(Robo.findByPk).toHaveBeenCalledWith(1, { transaction: t });
            expect(Mov.create).toHaveBeenCalledWith(
                { id_usuario: 1, id_robo: 1, data_movimentacao: '2024-11-07', tipo_movimentacao: 'saida', nf: '12345' },
                { transaction: t }
            );
            expect(req.id_movimentacao).toBe(2);
            expect(next).toHaveBeenCalled();
        });

        it('deve retornar erro se o usuário ou o robo não forem encontrados', async () => {
            req.params.tipo_movimentacao = 'saida';
            Usuario.findByPk.mockResolvedValue(null);

            await MovimentacaoController.realizarMov(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao realizar movimentação. Por favor, tente novamente.' });
            expect(t.rollback).toHaveBeenCalled();
        });
    });

    describe('listarMov', () => {
        it('deve listar todas as movimentações com sucesso', async () => {
            Mov.findAll.mockResolvedValue([{ id_movimentacao: 1 }]);

            await MovimentacaoController.listarMov(req, res);

            expect(Mov.findAll).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith([{ id_movimentacao: 1 }]);
        });

        it('deve retornar erro ao listar movimentações', async () => {
            Mov.findAll.mockRejectedValue(new Error('Database Error'));

            await MovimentacaoController.listarMov(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao obter a lista de movimentações. Por favor, tente novamente.' });
        });
    });

    describe('deletarMov', () => {
        it('deve deletar uma movimentação com sucesso', async () => {
            Mov.findByPk.mockResolvedValue({ destroy: jest.fn() });

            await MovimentacaoController.deletarMov(req, res);

            expect(Mov.findByPk).toHaveBeenCalledWith(req.params.id_mov);
            expect(res.send).toHaveBeenCalledWith({ message: 'Movimentação deletada com sucesso.' });
        });

        it('deve retornar erro se movimentação não for encontrada', async () => {
            Mov.findByPk.mockResolvedValue(null);

            await MovimentacaoController.deletarMov(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ error: 'Movimentação não encontrada.' });
        });

        it('deve retornar erro ao tentar deletar movimentação', async () => {
            Mov.findByPk.mockResolvedValue({ destroy: jest.fn().mockRejectedValue(new Error('Database Error')) });

            await MovimentacaoController.deletarMov(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao deletar movimentação' });
        });
    });

    describe('attEstoque', () => {
        it('deve atualizar o estoque com sucesso', async () => {
            Material.findByPk.mockResolvedValue({ id_material: 1, quantidade_material: 100, save: jest.fn() });

            await MovimentacaoController.attEstoque(req, res);

            expect(Material.findByPk).toHaveBeenCalledWith(1, { transaction: t });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.send).toHaveBeenCalledWith({ message: 'Movimentação realizada com sucesso.' });
        });

        it('deve retornar erro se o material não for encontrado', async () => {
            Material.findByPk.mockResolvedValue(null);

            await MovimentacaoController.attEstoque(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao realizar movimentação. Por favor, tente novamente.' });
            expect(t.rollback).toHaveBeenCalled();
        });

        it('deve retornar erro se a quantidade de material for insuficiente para saída', async () => {
            req.params.tipo_movimentacao = 'saida';
            Material.findByPk.mockResolvedValue({ id_material: 1, quantidade_material: 30, save: jest.fn() });

            await MovimentacaoController.attEstoque(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao realizar movimentação. Por favor, tente novamente.' });
            expect(t.rollback).toHaveBeenCalled();
        });
    });
});
