const express = require('express')
const path =require('path');
const app = express()
const port = 3000

app.get('/', (req, res) => {
let options={
    root:path.join(__dirname)
}
  res.sendFile("/views/index.html",options);
})
app.get("/hola",(req,res)=>{
res.send("hola que tal");
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})