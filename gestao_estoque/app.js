// const mysql = require("mysql")

// const db = mysql.createConnection({
//     host:"database-1.cv86mqw8cdtk.us-east-1.rds.amazonaws.com",
//     port:"3306",
//     user:"admin",
//     password:"adminmysql",
//     database:"gestao_estoque"
// })

// db.connect(err=>{
//     if(err){
//         console.log(err.message);
//         return;
//     }

//     console.log("Database connected.")
// })

require('dotenv').config({path:'./src/config/.env'})

const express = require('express');
const app = express()
const db = require('./src/database/index')
const path = require('path')
const router = require('./src/routes/router')
const userRouter = require('./src/routes/userRouter')
const adminRouter = require('./src/routes/adminRouter')
const cookieParser = require('cookie-parser');



db.authenticate()
  .then(() => {
    console.log('Conexão bem-sucedida.');
  })
  .catch(err => {
    console.error('Erro ao conectar-se ao banco de dados:', err);
  });


app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(express.json());

app.use(cookieParser());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'views'))

app.use(express.static(path.join(__dirname, 'client/build')))  
app.use('/user', express.json(),userRouter)
app.use('/admin', adminRouter) 
app.use(router)


app.listen(process.env.PORT, ()=>{
    console.log('server running')
})