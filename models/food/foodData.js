const {Food} = require('../schemas');

async function getFood() {
    try{
        const data = await Food.find({});
        for(let i = 0; i < 5;i++) {
            data[i].hell = i;
        }
        return data;
    } catch(Err) {
        throw Err;
    }
}

module.exports = {getFood};