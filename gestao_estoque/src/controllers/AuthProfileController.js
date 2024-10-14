
module.exports = function authorize(permissoesPermitidas) {
    return function(req, res, next) {
        const { funcao_usuario } = req.user; // Acessa a função do usuário do req.user

        if (!permissoesPermitidas.includes(funcao_usuario)) {
            return res.status(401).send("Acesso negado"); // Permissão negada
        }

        next(); // Permissão concedida
    }
}