const { cadastrarMaterial, listarMateriais, deletarMaterial, inativarMaterial, ativarMaterial } = require('../../src/controllers/MateriaisController');
const Material = require('../../src/models/Material');
const Categoria = require('../../src/models/Categoria');
const Estoque = require('../../src/models/Estoque');

jest.mock('../../src/models/Material');
jest.mock('../../src/models/Categoria');
jest.mock('../../src/models/Estoque');

describe('MaterialController', () => {

    describe('cadastrarMaterial', () => {
        it('cadastra um material com sucesso', async () => {
            const req = {
                body: {
                    id_categoria: 1,
                    id_estoque: 1,
                    descricao_material: "Parafuso",
                    unid_medida_material: "un",
                    quantidade_material: 100,
                    status_material: true
                }
            };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            Estoque.findByPk.mockResolvedValue({ id_estoque: 1 });
            Categoria.findByPk.mockResolvedValue({ id_categoria: 1 });
            Material.create.mockResolvedValue(req.body);

            await cadastrarMaterial(req, res);

            expect(res.json).toHaveBeenCalledWith(req.body);
        });

        it('retorna erro se o estoque não for encontrado', async () => {
            const req = { body: { id_categoria: 1, id_estoque: 999 } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            Estoque.findByPk.mockResolvedValue(null);

            await cadastrarMaterial(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ error: 'Estoque não encontrado.' });
        });

        it('retorna erro se a categoria não for encontrada', async () => {
            const req = { body: { id_categoria: 999, id_estoque: 1 } };
            const res = {
                json: jest.fn(),
                status: jest.fn().mockReturnThis(),
                send: jest.fn()
            };

            Estoque.findByPk.mockResolvedValue({ id_estoque: 1 });
            Categoria.findByPk.mockResolvedValue(null);

            await cadastrarMaterial(req, res);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith({ error: 'Categoria não encontrada.' });
        });
    });

    describe('listarMateriais', () => {
        it('lista todos os materiais com sucesso', async () => {
            const req = {};
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };
            const mockMateriais = [{ descricao_material: 'Parafuso', id_categoria: 1, id_estoque: 1 }];

            Material.findAll.mockResolvedValue(mockMateriais);

            await listarMateriais(req, res);

            expect(res.json).toHaveBeenCalledWith(mockMateriais);
        });

        it('retorna erro ao listar materiais', async () => {
            const req = {};
            const res = { json: jest.fn(), status: jest.fn().mockReturnThis(), send: jest.fn() };

            Material.findAll.mockRejectedValue(new Error('Erro ao listar'));

            await listarMateriais(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao obter a lista materiais. Por favor, tente novamente." });
        });
    });

    describe('deletarMaterial', () => {
        it('deleta um material com sucesso', async () => {
            const req = { params: { id_material: 1 } };
            const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };
            const mockMaterial = { id_material: 1, destroy: jest.fn() };

            Material.findByPk.mockResolvedValue(mockMaterial);

            await deletarMaterial(req, res);

            expect(mockMaterial.destroy).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith({ message: "Material deletado com sucesso." });
        });

        it('retorna erro se o material não for encontrado', async () => {
            const req = { params: { id_material: 999 } };
            const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

            Material.findByPk.mockResolvedValue(null);

            await deletarMaterial(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ error: "Material não encontrado." });
        });
    });

    describe('inativarMaterial', () => {
        it('inativa um material com sucesso', async () => {
            const req = { params: { id_material: 1 } };
            const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };
            const mockMaterial = { id_material: 1, status_material: true, save: jest.fn() };

            Material.findByPk.mockResolvedValue(mockMaterial);

            await inativarMaterial(req, res);

            expect(mockMaterial.status_material).toBe(false);
            expect(mockMaterial.save).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith({ message: "Material foi inativado com sucesso." });
        });

        it('retorna erro se o material não for encontrado', async () => {
            const req = { params: { id_material: 999 } };
            const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

            Material.findByPk.mockResolvedValue(null);

            await inativarMaterial(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ error: "Material não encontrado." });
        });
    });

    describe('ativarMaterial', () => {
        it('ativa um material com sucesso', async () => {
            const req = { params: { id_material: 1 } };
            const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };
            const mockMaterial = { id_material: 1, status_material: false, save: jest.fn() };

            Material.findByPk.mockResolvedValue(mockMaterial);

            await ativarMaterial(req, res);

            expect(mockMaterial.status_material).toBe(true);
            expect(mockMaterial.save).toHaveBeenCalled();
            expect(res.send).toHaveBeenCalledWith({ message: "Material foi ativado com sucesso." });
        });

        it('retorna erro se o material não for encontrado', async () => {
            const req = { params: { id_material: 999 } };
            const res = { send: jest.fn(), status: jest.fn().mockReturnThis() };

            Material.findByPk.mockResolvedValue(null);

            await ativarMaterial(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.send).toHaveBeenCalledWith({ error: "Material não encontrado." });
        });
    });
});
