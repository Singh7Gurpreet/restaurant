const mongoose = require('mongoose');

const new_credentials = new mongoose.Schema({
    name:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required: true,
    },
    salt:{
        type:String,
        required: true,
    }
});

module.exports = mongoose.model('credentials',new_credentials);