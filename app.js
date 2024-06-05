const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));



app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/login.html"));
})

app.get("/hell",(req,res)=>{
    console.log("I got request");
    res.sendStatus(200);
})

app.listen(3000,()=>{
    console.log("listening...");
})