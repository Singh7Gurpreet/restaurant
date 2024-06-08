const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const {connectionDb} = require('./database/setup');
const {validateCredentials,createAccount} = require("./services/authentication/credentials");

const app = express();
app.use(express.static('public'));
app.use(bodyparser.json());

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/login.html"));
})

app.post('/signup', (req,res)=>{
    const mail = req.body.email;
    const pass = req.body.password;
    const name = req.body.name;

    createAccount(mail,pass,name)
    .then(value => {
        console.log("account create successfully");
        res.sendStatus(200);
    }).catch(err => {
        console.log(err.message);
        res.sendStatus(500);
    })

})

app.post("/login",(req,res)=>{
    const mail = req.body.email;
    const pass = req.body.password;
    validateCredentials(mail,pass).then(token => {
        if(token === null) {
            res.sendStatus(404);
        } else {
            //the jwt token to be sent
            res.send(token);
        }
    }).catch(err => {
        console.log(err.message);
        res.sendStatus(404);
    })
})

connectionDb().then( value => {
    console.log("connected succesfully!");
}).catch(err => { 
    console.log("Not connected to database:\n",err.message);
});

app.listen(3000,()=>{
    console.log("listening...");
})