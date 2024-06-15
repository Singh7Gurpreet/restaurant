const express = require('express');
const router = express.Router();
const path = require('path');
const {getFood} = require('../models/food/foodData')

router.get('/',async (req,res,next)=>{
    const foodItems = await getFood();
    res.render(path.join(__dirname,'../views/public/food.ejs'),{
        data:foodItems
    });
});

module.exports = router;