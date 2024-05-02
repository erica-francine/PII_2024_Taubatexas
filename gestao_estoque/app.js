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

const express = require('express');
const app = express()
const PORT = 3000
const routes = require('./src/routes/routes')
const db = require('./src/database/index')
const path = require('path')


db.authenticate()
  .then(() => {
    console.log('Conexão bem-sucedida.');
  })
  .catch(err => {
    console.error('Erro ao conectar-se ao banco de dados:', err);
  });


app.use(express.static(path.join(__dirname, 'src', 'public')));

app.use(express.json());


app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'src', 'views'))

  
app.use(routes)


app.listen(PORT, ()=>{
    console.log('server running')
})