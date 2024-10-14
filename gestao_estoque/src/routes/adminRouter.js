const express = require('express');
const router = express.Router();
const authProfile = require('../controllers/AuthProfileController')

const auth = require('../controllers/AuthController')

router.get('/', auth,(req,res)=>{
  
  if(req.user.funcao_usuario == "admin"){
    res.send("Esse dado só deve ser visto pelo Admin")

  }
  else 
    res.send("Usuário não admin: acesso negado")
  })
  


module.exports = router;