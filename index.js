const express = require('express')
const path =require('path');
var mysql=require("mysql");
var bodyparser=require("body-parser");
const app = express()
const port = 3000

app.use(bodyparser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
let options={
    root:path.join(__dirname)
}
  res.sendFile("/views/index.html",options);
})


app.post("/",(req,res)=>{
    var conn=mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'biblioteca'
    });
    conn.connect();
    var libro={
        'codigo':req.body.codigo,
        'titulo':req.body.titulo,
        'genero':req.body.genero
    }
    var sql=`insert into libros
     set ?`;
    conn.query(sql,libro,(err,result,field)=>{
        if(err){
            console.log(err);
        }
        console.log(result)
        res.send("recibiendo datos..")
        conn.end();
    })
     
    
})


app.get("/hola",(req,res)=>{
res.send("hola que tal");
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})