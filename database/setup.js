const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname,"../config.env") });

const uri = process.env.DB_URI;

async function connectionDb() {
    try{
        mongoose.connect(process.env.DB_URI);
    } catch (err) { 
        console.log(err)
    }
    
}

module.exports = {connectionDb};