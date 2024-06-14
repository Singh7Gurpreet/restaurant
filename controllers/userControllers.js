const path = require('path');
const {validateCredentials,createAccount,getName} = require('../services/authentication/credentials');


function loginPage(req,res,next) {
    res.sendFile(path.join(__dirname,"../views/public/login.html"));
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
async function options(req,res,next) {
    const name = await getName(req.cookies['token']);
    res.render(path.join(__dirname,"../views/public/menu.ejs"),{
        name:name
    });
}

module.exports = {
    loginPage,
    loginRequest,
    signUpRequest,
    options
}

