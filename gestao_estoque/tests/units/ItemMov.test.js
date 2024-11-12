const { addItemMov, listarItensMov, deletaItemMov } = require('../../src/controllers/ItemMovimentacaoController'); 
const Item_Movimentacao = require('../../src/models/Item_Movimentacao');
const Material = require('../../src/models/Material');

jest.mock('../../src/models/Material');
jest.mock('../../src/models/Item_Movimentacao');

describe('Controller de Movimentação', () => {

    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            transaction: { rollback: jest.fn() },  
            body: {},
            params: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addItemMov', () => {
        it('deve retornar erro se nenhum item for fornecido para movimentação', async () => {
            req.body.itens_movimentacao = [];

            await addItemMov(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao realizar movimentação. Por favor, tente novamente." });
        });

        it('deve retornar erro se um material não for encontrado', async () => {
            req.body.itens_movimentacao = [{ id_material: 1, quantidade_material: 5, valor_unit: 100, valor_total: 500 }];
            Material.findByPk.mockResolvedValue(null);  

            await addItemMov(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao realizar movimentação. Por favor, tente novamente." });
        });

        it('deve adicionar item na movimentação com sucesso', async () => {
            req.body.itens_movimentacao = [{ id_material: 1, quantidade_material: 5, valor_unit: 100, valor_total: 500 }];
            Material.findByPk.mockResolvedValue({ id: 1 });  
            Item_Movimentacao.create.mockResolvedValue({});  

            await addItemMov(req, res, next);

            expect(Item_Movimentacao.create).toHaveBeenCalledWith({
                id_movimentacao: req.id_movimentacao,
                id_material: 1,
                quantidade_material: 5,
                valor_unit: 100,
                valor_total: 500
            }, { transaction: req.transaction });
            expect(next).toHaveBeenCalled();
        });

        it('deve retornar erro se nenhum material válido for encontrado', async () => {
            req.body.itens_movimentacao = [{ id_material: 1, quantidade_material: 5, valor_unit: 100, valor_total: 500 }];
            Material.findByPk.mockResolvedValue(null);  

            await addItemMov(req, res, next);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao realizar movimentação. Por favor, tente novamente." });
        });
    });

    describe('listarItensMov', () => {
        it('deve listar itens da movimentação com sucesso', async () => {
            const mockItens = [{ id: 1, quantidade: 10 }];
            Item_Movimentacao.findAll.mockResolvedValue(mockItens);

            await listarItensMov(req, res);

            expect(Item_Movimentacao.findAll).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith(mockItens);
        });

        it('deve retornar erro ao listar itens da movimentação', async () => {
            Item_Movimentacao.findAll.mockRejectedValue(new Error('Database error'));

            await listarItensMov(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao obter a lista de itens da movimentação. Por favor, tente novamente." });
        });
    });

    describe('deletaItemMov', () => {
        it('deve retornar erro se o item não for encontrado', async () => {
            req.params.id_item_mov = 1;
            Item_Movimentacao.findByPk.mockResolvedValue(null);

            await deletaItemMov(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ error: "Item não encontrado." });
        });

        it('deve deletar o item com sucesso', async () => {
            req.params.id_item_mov = 1;
            Item_Movimentacao.findByPk.mockResolvedValue({ destroy: jest.fn() });

            await deletaItemMov(req, res);

            expect(Item_Movimentacao.findByPk).toHaveBeenCalledWith(1);
            expect(res.send).toHaveBeenCalledWith({ message: "Item deletado com sucesso." });
        });

        it('deve retornar erro ao deletar item da movimentação', async () => {
            req.params.id_item_mov = 1;
            Item_Movimentacao.findByPk.mockResolvedValue({ destroy: jest.fn().mockRejectedValue(new Error('Database error')) });

            await deletaItemMov(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao deletar item da movimentação" });
        });
    });
});
