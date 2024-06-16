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

const food = new mongoose.Schema({
    id:{
        type:String,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    image:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    }
});

const Credentials = mongoose.model('credentials',new_credentials);
const Reservations = mongoose.model('reservations',new_reservation);
const Food = mongoose.model('Food',food);
module.exports = {Credentials,Reservations,Food};