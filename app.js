const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');

const {validateCredentials} = require("./services/login/authenticate");

const app = express();
app.use(express.static('public'));
app.use(bodyparser.json());

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/login.html"));
})

app.post("/submit",async (req,res)=>{
    const mail = req.body.email;
    const pass = req.body.password;
    console.log(mail,pass);
    const token = validateCredentials(mail,pass);
    if(token === null){
        //not found
        res.sendStatus(500);
    } else {
        // send token and status
    }
})

app.listen(3000,()=>{
    console.log("listening...");
})