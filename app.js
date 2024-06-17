const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const {connectionDb} = require('./database/setup');
const {validateCredentials,createAccount} = require("./services/authentication/credentials");
const jwt = require('jsonwebtoken');
const {router} = require('./controllers/routes/userRoutes');
const session = require('express-session');

const app = express();
app.use(session({
    secret: '1234',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Set to true if using HTTPS
}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'views/public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/',router);


connectionDb().then( value => {
    console.log("connected succesfully!");
}).catch(err => { 
    console.log("Not connected to database:\n",err.message);
});

app.listen(3000,()=>{
    console.log("listening...");
})