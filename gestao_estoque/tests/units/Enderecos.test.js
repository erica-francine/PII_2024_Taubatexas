const Endereco = require('../../src/models/Endereco_Fornecedor');
const Fornecedor = require('../../src/models/Fornecedor');
const enderecoController = require('../../src/controllers/EnderecosController');

jest.mock('../../src/models/Endereco_Fornecedor');
jest.mock('../../src/models/Fornecedor');

describe('Testes do Controller de Endereço', () => {

    describe('criarEndereco', () => {
        it('deve criar um endereço com sucesso', async () => {
            const req = {
                params: { id_fornecedor: 1 },
                body: {
                    logradouro_endereco_fornecedor: 'Rua X',
                    numero_endereco_fornecedor: '123',
                    rua_endereco_fornecedor: 'Rua X',
                    bairro_endereco_fornecedor: 'Bairro Y',
                    complemento_endereco_fornecedor: 'Apto 101',
                    cidade_endereco_fornecedor: 'Cidade Z',
                    estado_endereco_fornecedor: 'SP',
                    cep_endereco_fornecedor: '12345678'
                }
            };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula o fornecedor encontrado
            Fornecedor.findByPk.mockResolvedValue({ id_fornecedor: 1 });

            // Simula a criação do endereço
            Endereco.create.mockResolvedValue(req.body);

            await enderecoController.criarEndereco(req, res);

            expect(Fornecedor.findByPk).toHaveBeenCalledWith(1);
            expect(Endereco.create).toHaveBeenCalledWith(expect.objectContaining({
                id_fornecedor: 1,
                ...req.body
            }));
            expect(res.send).toHaveBeenCalledWith(req.body);
        });

        it('deve retornar erro 400 se o fornecedor não for encontrado', async () => {
            const req = {
                params: { id_fornecedor: 1 },
                body: {
                    logradouro_endereco_fornecedor: 'Rua X',
                    numero_endereco_fornecedor: '123',
                    rua_endereco_fornecedor: 'Rua X',
                    bairro_endereco_fornecedor: 'Bairro Y',
                    complemento_endereco_fornecedor: 'Apto 101',
                    cidade_endereco_fornecedor: 'Cidade Z',
                    estado_endereco_fornecedor: 'SP',
                    cep_endereco_fornecedor: '12345678'
                }
            };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula fornecedor não encontrado
            Fornecedor.findByPk.mockResolvedValue(null);

            await enderecoController.criarEndereco(req, res);

            expect(res.status).toHaveBeenCalledWith(400); 
            expect(res.send).toHaveBeenCalledWith({ error: 'Fornecedor não encontrado.' }); 
        });

        it('deve retornar erro ao criar endereço', async () => {
            const req = {
                params: { id_fornecedor: 1 },
                body: {
                    logradouro_endereco_fornecedor: 'Rua X',
                    numero_endereco_fornecedor: '123',
                    rua_endereco_fornecedor: 'Rua X',
                    bairro_endereco_fornecedor: 'Bairro Y',
                    complemento_endereco_fornecedor: 'Apto 101',
                    cidade_endereco_fornecedor: 'Cidade Z',
                    estado_endereco_fornecedor: 'SP',
                    cep_endereco_fornecedor: '12345678'
                }
            };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula o fornecedor encontrado
            Fornecedor.findByPk.mockResolvedValue({ id_fornecedor: 1 });

            // Simula erro ao criar o endereço
            Endereco.create.mockRejectedValue(new Error('Erro ao criar endereço'));

            await enderecoController.criarEndereco(req, res);

            expect(res.status).toHaveBeenCalledWith(500); 
            expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao criar o endereço. Por favor, tente novamente.' }); 
        });
    });

    describe('listarEnderecos', () => {
        it('deve listar os endereços do fornecedor', async () => {
            const req = { params: { id_fornecedor: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula fornecedor encontrado com endereços
            Fornecedor.findByPk.mockResolvedValue({
                id_fornecedor: 1,
                enderecos: [{ id_endereco: 1, logradouro_endereco_fornecedor: 'Rua X' }]
            });

            await enderecoController.listarEnderecos(req, res);

            expect(Fornecedor.findByPk).toHaveBeenCalledWith(1, { include: { association: 'enderecos' } });
            expect(res.send).toHaveBeenCalledWith([{ id_endereco: 1, logradouro_endereco_fornecedor: 'Rua X' }]);
        });

        it('deve retornar erro 400 se o fornecedor não for encontrado', async () => {
            const req = { params: { id_fornecedor: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula fornecedor não encontrado
            Fornecedor.findByPk.mockResolvedValue(null);

            await enderecoController.listarEnderecos(req, res);

            expect(res.status).toHaveBeenCalledWith(400); 
            expect(res.send).toHaveBeenCalledWith({ error: 'Fornecedor não encontrado.' }); 
        });

        it('deve retornar erro ao listar endereços', async () => {
            const req = { params: { id_fornecedor: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula erro ao buscar fornecedor
            Fornecedor.findByPk.mockRejectedValue(new Error('Erro ao listar endereços'));

            await enderecoController.listarEnderecos(req, res);

            expect(res.status).toHaveBeenCalledWith(500); 
            expect(res.send).toHaveBeenCalledWith({ error: 'Erro ao obter a lista de endereços. Por favor, tente novamente.' }); 
        });
    });

    describe('deletarEndereco', () => {
        it('deve deletar o endereço com sucesso', async () => {
            const req = { params: { id_endereco: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula o endereço encontrado
            Endereco.findByPk.mockResolvedValue({
                id_endereco: 1,
                destroy: jest.fn()
            });

            await enderecoController.deletarEndereco(req, res);

            expect(Endereco.findByPk).toHaveBeenCalledWith(1);
            expect(res.send).toHaveBeenCalledWith({ message: "Endereço deletado com sucesso." }); 
        });

        it('deve retornar erro 404 se o endereço não for encontrado', async () => {
            const req = { params: { id_endereco: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula endereço não encontrado
            Endereco.findByPk.mockResolvedValue(null);

            await enderecoController.deletarEndereco(req, res);

            expect(res.status).toHaveBeenCalledWith(404); 
            expect(res.send).toHaveBeenCalledWith({ error: "Endereço não encontrado." }); 
        });

        it('deve retornar erro ao deletar o endereço', async () => {
            const req = { params: { id_endereco: 1 } };
            const res = {
                send: jest.fn(),
                status: jest.fn().mockReturnThis()
            };

            // Simula erro ao tentar deletar o endereço
            Endereco.findByPk.mockResolvedValue({
                id_endereco: 1,
                destroy: jest.fn().mockRejectedValue(new Error('Erro ao deletar'))
            });

            await enderecoController.deletarEndereco(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.send).toHaveBeenCalledWith({ error: "Erro ao deletar o endereço" }); 
        });
    });

});
