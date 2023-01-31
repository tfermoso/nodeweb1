const express = require('express')
const path = require('path');
var mysql = require("mysql");
const fs = require('fs');
var bodyparser = require("body-parser");
const app = express()
const port = 3000;

app.use(express.static('public'))
app.use(bodyparser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    let options = {
        root: path.join(__dirname)
    }
    //Conexión a BBDD para leer los libros
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'biblioteca'
    });
    conn.connect();
    conn.query("select * from libros", (err, results, fields) => {
        let filas = "";
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            filas += `<tr><td>${element.idlibro}</td><td>${element.codigo}</td>
        <td>${element.titulo}</td>
        <td>${element.genero}</td>
        </tr>`;
        }
        try {
            const data = fs.readFileSync('./views/index.html', 'utf8');
            let contenido=data.replace("##libros_rows##",filas);
            res.send(contenido); 
        } catch (err) {
            console.error(err);
            res.send("Error 404");
        }

    
    })
    //res.sendFile("/views/index.html",options);
})


app.post("/", (req, res) => {
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'biblioteca'
    });
    conn.connect();
    var libro = {
        'codigo': req.body.codigo,
        'titulo': req.body.titulo,
        'genero': req.body.genero
    }
    var sql = `insert into libros set ?`;
    conn.query(sql, libro, (err, result, field) => {
        if (err) {
            console.log(err);
            res.send("Error conectando a la bbdd");
        }
        console.log(result)
        res.redirect("/");
        conn.end();
    })


})


app.get("/libros", (req, res) => {
    var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'biblioteca'
    });
    conn.connect();
    conn.query("select * from libros", (err, results, fields) => {
        let filas = "";
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            filas += `<tr><td>${element.codigo}</td>
            <td>${element.titulo}</td>
            <td>${element.genero}</td>
            </tr>`;
        }
        let tabla = `<table>
        <thead>
            <th>Codigo</th>
            <th>Título</th>
            <th>Género</th>
        </thead>
        <tbody>
           ${filas}
        </tbody>
    </table>`;

        console.log(err)
        console.log(results);
        res.send(tabla);
    })


})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})