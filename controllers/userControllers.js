const path = require('path');
const {validateCredentials,createAccount} = require('../services/authentication/credentials');


function loginPage(req,res,next) {
    res.sendFile(path.join(__dirname,"../public/login.html"));
}
function signUpRequest(req,res,next) {
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
}
function loginRequest(req,res,next) {
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
}
function options(req,res,next) {
    res.sendFile(path.join(__dirname,"../public/menu.html"));
}

function reservationRequest(req,res,next) {
    res.render(path.join(__dirname,"../views/reservation"),{
        timeSlots:[1,2,3,4,5,6,6,6,6,6,6,6,6,6]
    });
    res.send()
}

module.exports = {
    reservationRequest,
    loginPage,
    loginRequest,
    signUpRequest,
    options
}

