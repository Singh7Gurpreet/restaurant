const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const {connectionDb} = require('./database/setup');
const {validateCredentials,createAccount} = require("./services/authentication/credentials");
const jwt = require('jsonwebtoken');


const app = express();
app.use(express.static('public'));
app.use(bodyparser.json());

function verifyToken(req, res, next) {
    const token = (req.headers.authorization || req.query.token);
    console.log(token);
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY); // Assuming token is in format 'Bearer your_token'
      req.user = decoded; // Attach user information to the request object
      next();
    } catch (error) {
      return res.status(403).json({ error: 'Forbidden' });
    }
  }

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/login.html"));
})

app.post('/signup', (req,res)=>{
    const mail = req.body.email;
    const pass = req.body.password;
    const name = req.body.name;

    createAccount(mail,pass,name)
    .then(value => {
        if(value === true) {
            res.sendStatus(200);
        } else {
            res.sendStatus(403);
        }
    }).catch(err => {
        console.log(err.message);
        res.sendStatus(500);
    })
});

app.post("/login",(req,res)=>{
    const mail = req.body.email;
    const pass = req.body.password;
    validateCredentials(mail,pass).then(token => {
        if(token === null) {
            res.sendStatus(404);
        } else {
            res.send(token);
        }
    }).catch(err => {
        console.log(err.message);
        res.sendStatus(404);
    })
});

app.get("/menu",(req,res) => {
    res.sendFile(path.join(__dirname,"/public/menu.html"));
});

app.get("/reservation",verifyToken,(req,res)=>{
    res.sendFile(path.join(__dirname,"/public/reservationPage.html"));
});

connectionDb().then( value => {
    console.log("connected succesfully!");
}).catch(err => { 
    console.log("Not connected to database:\n",err.message);
});

app.listen(3000,()=>{
    console.log("listening...");
})