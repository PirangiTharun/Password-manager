const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');
const PORT = 3001;

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'pirangi2000',
    database: 'passwordmanager'
});
app.get('/',(req,res)=>{
    res.send("I guess you're working!!");
})

app.post('/addPassword',(req,res)=>{
    const {password, title} = req.body;
    db.query("INSERT INTO passwords (password, title) VALUES (?,?)",
    [password, title],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({status: 'success',data:null});
      }
    });
})

app.get('/getAllRecords',(req,res)=>{
    db.query("SELECT * FROM passwords",(err,result)=>{
        if(err) console.log(err);
        else res.send(result);
    });
})

app.listen(PORT,()=>{
    console.log("Server is running on port 3001");
})