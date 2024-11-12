const authController = require('../../src/controllers/AuthController'); 
const jwt = require('jsonwebtoken');


jest.mock('jsonwebtoken');

describe('AuthController', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            cookies: {}
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

    describe('AuthController', () => {
        let req;
        let res;
        let next;
    
        beforeEach(() => {
            req = {
                cookies: {} 
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
    
        describe('Token presente e válido', () => {
            it('deve chamar o next() e adicionar o usuário no req.user se o token for válido', () => {
                const mockToken = 'validToken';
                const mockUser = { id: 1, name: 'John Doe' };
    
                // Simula a configuração do cookie
                req.cookies['authorization-token'] = mockToken;
    
                // Simula jwt.verify retornando o usuário verificado
                jwt.verify.mockReturnValue(mockUser);
    
                authController(req, res, next);
    
                expect(jwt.verify).toHaveBeenCalledWith(mockToken, process.env.TOKEN_SECRET);
                expect(req.user).toEqual(mockUser);
                expect(next).toHaveBeenCalled();
            });
        });
    
        describe('Token ausente', () => {
            it('deve retornar erro 401 se o token não estiver presente nos cookies', () => {
                req.cookies['authorization-token'] = undefined;
    
                authController(req, res, next);
    
                expect(res.status).toHaveBeenCalledWith(401);
                expect(res.send).toHaveBeenCalledWith("Acesso negado. Token não fornecido");
            });
        });
    
        describe('Token inválido', () => {
            it('deve retornar erro 401 se o token for inválido', () => {
                const mockToken = 'invalidToken';
                req.cookies['authorization-token'] = mockToken;
    
                // Simula erro de token inválido
                jwt.verify.mockImplementation(() => {
                    throw new Error('Invalid token');
                });
    
                authController(req, res, next);
    
                expect(res.status).toHaveBeenCalledWith(401);
                expect(res.send).toHaveBeenCalledWith("Acesso negado");
            });
        });
    });
    
});
