const {Food} = require('../schemas');
const fs = require('fs');

async function getFood() {
    try{
        const data = await Food.find({});
        return data;
    } catch(Err) {
        throw Err;
    }
}

async function getFoodById(id) {
    try{
        const data = await Food.find({"id":id}); 
        return data;
    } catch(err) {
        console.log("Could not find food number: ",id);
        throw err;
    }
}

async function renderData(requestData) {
    const result = [];
    try{
    const data = JSON.parse(requestData);
    for(let i = 0; i < data.length; i++) {
        const qty = data[i][1];
        let food = await getFoodById(data[i][0].foodid);
        food = food[0];
        const buffer = {
            id:food.id,
            name:food.name,
            image:food.image,
            price:food.price,
            qty:qty
        }
        result.push(buffer);
    }
    return result;
    } catch(error) {
        throw error;
    }
}

module.exports = {getFood,getFoodById,renderData};