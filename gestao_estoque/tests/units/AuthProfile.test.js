const authorize = require('../../src/controllers/AuthProfileController');

describe('authorize middleware', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = {
            user: {} 
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

    describe('quando o usuário tem permissão', () => {
        it('deve permitir o acesso e chamar next() para admin', () => {
            // Define um usuário com função 'admin' que tem permissão
            req.user.funcao_usuario = 'admin';

            const permissoesPermitidas = ['admin', 'gestor', 'operador'];

            // Chama o middleware
            authorize(permissoesPermitidas)(req, res, next);

            // Verifica se o próximo middleware foi chamado
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled(); // Verifica se o status 401 não foi chamado
        });

        it('deve permitir o acesso e chamar next() para gestor', () => {
            // Defina um usuário com função 'gestor' que tem permissão
            req.user.funcao_usuario = 'gestor';

            const permissoesPermitidas = ['admin', 'gestor', 'operador'];

            // Chama o middleware
            authorize(permissoesPermitidas)(req, res, next);

            // Verifica se o próximo middleware foi chamado
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled(); // Verifica se o status 401 não foi chamado
        });

        it('deve permitir o acesso e chamar next() para operador', () => {
            // Define um usuário com função 'operador' que tem permissão
            req.user.funcao_usuario = 'operador';

            const permissoesPermitidas = ['operador'];

            // Chama o middleware
            authorize(permissoesPermitidas)(req, res, next);

            // Verifica se o próximo middleware foi chamado
            expect(next).toHaveBeenCalled();
            expect(res.status).not.toHaveBeenCalled(); // Verifica se o status 401 não foi chamado
        });
    });

    describe('quando o usuário não tem permissão', () => {
        it('deve bloquear o acesso e retornar status 401 para operador tentando acessar funções restritas', () => {
            // Define um usuário com função 'operador' que não tem permissão
            req.user.funcao_usuario = 'operador';

            const permissoesPermitidas = ['admin', 'gestor']; // Funções para as quais o operador não tem permissão

            // Chama o middleware
            authorize(permissoesPermitidas)(req, res, next);

            // Verifica se o status 401 foi chamado
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith("Acesso negado"); // Verifica a mensagem de acesso negado
            expect(next).not.toHaveBeenCalled(); // Verifica se o next não foi chamado
        });

        it('deve bloquear o acesso e retornar status 401 para gestor tentando acessar função admin', () => {
            // Define um usuário com função 'gestor' que não tem permissão para 'admin'
            req.user.funcao_usuario = 'gestor';

            const permissoesPermitidas = ['admin']; // Função para a qual o gestor não tem permissão

            // Chama o middleware
            authorize(permissoesPermitidas)(req, res, next);

            // Verifica se o status 401 foi chamado
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith("Acesso negado"); // Verifica a mensagem de acesso negado
            expect(next).not.toHaveBeenCalled(); // Verifica se o next não foi chamado
        });

        
    });

    describe('quando a função do usuário não é especificada', () => {
        it('deve bloquear o acesso e retornar status 401', () => {
            
            req.user.funcao_usuario = undefined;

            const permissoesPermitidas = ['admin', 'gestor', 'operador'];

            // Chama o middleware
            authorize(permissoesPermitidas)(req, res, next);

            // Verifica se o status 401 foi chamado
            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith("Acesso negado");
            expect(next).not.toHaveBeenCalled(); // Verifica se o next não foi chamado
        });
    });
});
