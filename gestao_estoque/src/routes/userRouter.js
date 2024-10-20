const express = require('express');
const router = express.Router();
const userController = require('../controllers/UsuariosController')
const authController = require('../controllers/AuthController')
const authProfile = require('../controllers/AuthProfileController')


router.post('/register', userController.register)

router.post('/login', userController.login)

router.post('/logout', (req,res)=>{
    res.clearCookie('authorization-token')
    res.send('Logout realizado com sucesso')
})

router.use(authController)

router.get('/users', authProfile(['admin']), userController.listarUsuarios)

router.post('/inativar', authProfile(['admin']), express.urlencoded({extended: true}), userController.inativarUsuario)
router.post('/ativar', authProfile(['admin']),  express.urlencoded({extended: true}), userController.ativarUsuario)

router.delete('/delete', authProfile(['admin']), express.urlencoded({extended: true}), userController.deletarUsuario)


module.exports = router