const {Food} = require('../schemas');

async function getFood() {
    try{
        const data = await Food.find({});
        return data;
    } catch(Err) {
        throw Err;
    }
}

module.exports = {getFood};