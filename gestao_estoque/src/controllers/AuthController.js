const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    const token = req.header('authorization-token');

    if(!token) return res.status(401).send("Acesso negado")


    try{
        const userVerificado = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = userVerificado;
        next()
    }catch (error){
        res.status(401).send("Acesso negado")
    }

}