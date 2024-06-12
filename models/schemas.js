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

const new_reservation = new mongoose.Schema({
    date:{
        type:String,
        require:true
    },
    reservations:{
        type : mongoose.Schema.Types.Mixed,
        require:true
    }
});

const Credentials = mongoose.model('credentials',new_credentials);
const Reservations = mongoose.model('reservations',new_reservation);
module.exports = {Credentials,Reservations};