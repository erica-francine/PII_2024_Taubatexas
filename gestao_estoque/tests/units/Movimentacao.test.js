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
jest.mock('../../src/database/index');

describe('MovimentacaoController', () => {
  let req, res, next, transaction;

  beforeEach(() => {
    req = { params: {}, body: {}, id_movimentacao: null, transaction: null };
    res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
    next = jest.fn();
    transaction = { commit: jest.fn(), rollback: jest.fn() };

    connection.transaction.mockResolvedValue(transaction);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('realizarMov', () => {
    it('deve criar uma movimentação de entrada com sucesso', async () => {
      req.params.tipo_movimentacao = 'entrada';
      req.body = { id_fornecedor: 1, data_movimentacao: '2024-11-07', itens_movimentacao: [{ id_material: 1, quantidade_material: 10 }], nf: '12345' };

      Fornecedor.findByPk.mockResolvedValue({ id: 1 });
      Mov.create.mockResolvedValue({ id_movimentacao: 1 });

      await MovimentacaoController.realizarMov(req, res, next);

      expect(Fornecedor.findByPk).toHaveBeenCalledWith(1, { transaction });
      expect(Mov.create).toHaveBeenCalledWith(
        { id_fornecedor: 1, data_movimentacao: '2024-11-07', tipo_movimentacao: 'entrada', nf: '12345' },
        { transaction }
      );
      expect(req.id_movimentacao).toBe(1);
      expect(next).toHaveBeenCalled();
    });

    it('deve retornar erro se o fornecedor não for encontrado', async () => {
      req.params.tipo_movimentacao = 'entrada';
      req.body = { id_fornecedor: 1, itens_movimentacao: [{ id_material: 1, quantidade_material: 10 }] };

      Fornecedor.findByPk.mockResolvedValue(null);

      await MovimentacaoController.realizarMov(req, res, next);

      expect(transaction.rollback).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao realizar movimentação. Por favor, tente novamente.' });
    });

    it('deve criar uma movimentação de saída com sucesso', async () => {
      req.params.tipo_movimentacao = 'saida';
      req.body = { id_usuario: 1, id_robo: 1, data_movimentacao: '2024-11-07', itens_movimentacao: [{ id_material: 1, quantidade_material: 5 }], nf: '12345' };

      Usuario.findByPk.mockResolvedValue({ id: 1 });
      Robo.findByPk.mockResolvedValue({ id: 1 });
      Mov.create.mockResolvedValue({ id_movimentacao: 2 });

      await MovimentacaoController.realizarMov(req, res, next);

      expect(Usuario.findByPk).toHaveBeenCalledWith(1, { transaction });
      expect(Robo.findByPk).toHaveBeenCalledWith(1, { transaction });
      expect(Mov.create).toHaveBeenCalledWith(
        { id_usuario: 1, id_robo: 1, data_movimentacao: '2024-11-07', tipo_movimentacao: 'saida', nf: '12345' },
        { transaction }
      );
      expect(req.id_movimentacao).toBe(2);
      expect(next).toHaveBeenCalled();
    });
  });

  describe('listarMov', () => {
    it('deve listar todas as movimentações', async () => {
      const movimentacoes = [{ id: 1 }, { id: 2 }];
      Mov.findAll.mockResolvedValue(movimentacoes);

      await MovimentacaoController.listarMov(req, res);

      expect(res.send).toHaveBeenCalledWith(movimentacoes);
    });

    it('deve retornar erro ao listar movimentações', async () => {
      Mov.findAll.mockRejectedValue(new Error('Erro ao obter movimentações'));

      await MovimentacaoController.listarMov(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao obter a lista de movimentações. Por favor, tente novamente.' });
    });
  });

  describe('deletarMov', () => {
    it('deve deletar a movimentação com sucesso', async () => {
      req.params.id_mov = 1;
      const movimentacao = { destroy: jest.fn() };
      Mov.findByPk.mockResolvedValue(movimentacao);

      await MovimentacaoController.deletarMov(req, res);

      expect(movimentacao.destroy).toHaveBeenCalled();
      expect(res.send).toHaveBeenCalledWith({ message: 'Movimentação deletada com sucesso.' });
    });

    it('deve retornar erro ao não encontrar a movimentação', async () => {
      req.params.id_mov = 1;
      Mov.findByPk.mockResolvedValue(null);

      await MovimentacaoController.deletarMov(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith({ error: 'Movimentação não encontrada.' });
    });
  });

  describe('attEstoque', () => {
    it('deve atualizar o estoque para entrada', async () => {
      req.params.tipo_movimentacao = 'entrada';
      req.body.itens_movimentacao = [{ id_material: 1, quantidade_material: 5 }];
      req.transaction = transaction;

      Material.findByPk.mockResolvedValue({ quantidade_material: 10, save: jest.fn() });

      await MovimentacaoController.attEstoque(req, res);

      expect(Material.findByPk).toHaveBeenCalledWith(1, { transaction });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ message: 'Movimentação realizada com sucesso.' });
    });

    it('deve retornar erro se o material não for encontrado', async () => {
      req.params.tipo_movimentacao = 'entrada';
      req.body.itens_movimentacao = [{ id_material: 1, quantidade_material: 5 }];
      req.transaction = transaction;

      Material.findByPk.mockResolvedValue(null);

      await MovimentacaoController.attEstoque(req, res);

      expect(transaction.rollback).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao realizar movimentação. Por favor, tente novamente.' });
    });
  });
});
