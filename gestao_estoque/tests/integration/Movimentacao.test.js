const request = require('supertest');
const app = require('../../app');
const jwt = require('jsonwebtoken');
const MovController = require('../../src/controllers/MovimentacaoController');
const ItemController = require('../../src/controllers/ItemMovimentacaoController');

jest.mock('../../src/controllers/MovimentacaoController');
jest.mock('../../src/controllers/ItemMovimentacaoController');

describe('POST /movimentacoes/:tipo_movimentacao', () => {
  let authToken;

  beforeAll(() => {
    // Gera um token JWT simulado para autenticação com perfil de usuário autorizado
    authToken = jwt.sign({ funcao_usuario: 'admin' }, process.env.TOKEN_SECRET);
  });

    afterAll(async () => {
        await db.close();  // Fechar a conexão com o banco de dados
    });

  beforeEach(() => {
    
    MovController.realizarMov.mockImplementation((req, res, next) => {
      req.id_movimentacao = 1; 
      req.transaction = {}; 
      next(); 
    });
  

    ItemController.addItemMov.mockImplementation((req, res, next) => {
      const { itens_movimentacao } = req.body;

      if (!itens_movimentacao || itens_movimentacao.length === 0) {
        return res.status(400).send({ error: "Nenhum item foi fornecido para movimentação" });
      }
      next();
    });
  
    MovController.attEstoque.mockImplementation((req, res) => {
      const { itens_movimentacao } = req.body;
  
      if (!itens_movimentacao || itens_movimentacao.length === 0) {
        return res.status(400).send({ error: "Nenhum item adicionado na movimentação." });
      }
  
      for (const item of itens_movimentacao) {
        if (item.quantidade_material <= 0) {
          return res.status(400).send({ error: `Quantidade inválida para o material ${item.id_material}.` });
        }
      }
  
      return res.status(200).send({ message: 'Movimentação realizada com sucesso' });
    });
  });

  it('deve criar uma movimentação de estoque com sucesso quando o usuário tem permissão', async () => {
    const tipoMovimentacao = 'entrada';
    const movimentacaoData = {
      id_fornecedor: '1',
      data_movimentacao: '2023-10-12',
      nf: '123456',
      itens_movimentacao: [
        { id_material: '1', quantidade_material: 10, valor_unit: 5, valor_total: 50 },
        { id_material: '2', quantidade_material: 5, valor_unit: 10, valor_total: 50 }
      ]
    };

    const response = await request(app)
      .post(`/movimentacoes/${tipoMovimentacao}`)
      .set('Cookie', [`authorization-token=${authToken}`]) // Envia o token de autenticação no cookie
      .send(movimentacaoData);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'Movimentação realizada com sucesso' });
  });

  it('deve retornar 401 quando o usuário não tem permissão', async () => {
    // Gerar token JWT simulado para um usuário undefined
    const unauthorizedToken = jwt.sign({ funcao_usuario: undefined }, process.env.TOKEN_SECRET);

    const tipoMovimentacao = 'entrada';
    const movimentacaoData = {
      id_fornecedor: '1',
      data_movimentacao: '2023-10-12',
      nf: '123456',
      itens_movimentacao: [
        { id_material: '1', quantidade_material: 10, valor_unit: 5, valor_total: 50 }
      ]
    };

    const response = await request(app)
      .post(`/movimentacoes/${tipoMovimentacao}`)
      .set('Cookie', [`authorization-token=${unauthorizedToken}`]) // Envia o token de um usuário não definido
      .send(movimentacaoData);

    expect(response.status).toBe(401);
    expect(response.text).toBe('Acesso negado');
  });

  it('deve retornar 400 se não houver itens para movimentação no addItemMov', async () => {
    const tipoMovimentacao = 'entrada';
    const response = await request(app)
      .post(`/movimentacoes/${tipoMovimentacao}`)
      .set('Cookie', [`authorization-token=${authToken}`])
      .send({ itens_movimentacao: [] }); // Envia um array vazio, simulando falta de itens
  
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Nenhum item foi fornecido para movimentação");
  });
  


  it('deve retornar 404 se algum material não for encontrado durante a movimentação', async () => {
    MovController.realizarMov.mockImplementation((req, res, next) => {
      req.id_movimentacao = 1;
      req.transaction = {}; // Simula uma transação
      next();
    });

    ItemController.addItemMov.mockImplementation((req, res) => {
      return res.status(404).send({ error: "Material não encontrado para Código: 123" });
    });

    const tipoMovimentacao = 'entrada';
    const movimentacaoData = {
      id_fornecedor: '1',
      data_movimentacao: '2023-10-12',
      nf: '123456',
      itens_movimentacao: [
        { id_material: '123', quantidade_material: 10, valor_unit: 5, valor_total: 50 }
      ]
    };

    const response = await request(app)
      .post(`/movimentacoes/${tipoMovimentacao}`)
      .set('Cookie', [`authorization-token=${authToken}`])
      .send(movimentacaoData);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Material não encontrado para Código: 123');
  });
});
