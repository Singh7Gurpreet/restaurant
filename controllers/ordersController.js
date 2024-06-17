const express = require('express');
const router = express.Router();
const path = require('path');
const {getFood,getFoodById,renderData} = require('../models/food/foodData')

router.use(express.static(path.join(__dirname, '../views/public')));

router.get('/',async (req,res,next) => {
    const foodItems = await getFood();
    res.render(path.join(__dirname,'../views/public/food.ejs'),{
        data:foodItems
    });
});

router.post('/cart',async (req,res,next) => {

    req.session.cart = req.body.items;
    req.session.amount = req.body.amt;
    res.sendStatus(200);
});

router.get('/cart',async (req,res)=>{
    try {
        const dataToBeRendered = await renderData(req.session.cart);
        res.render(path.join(__dirname,'../views/public/cart.ejs'),{
            data:dataToBeRendered,
            amount:req.session.amount
        });
    } catch(err) {
        console.log(err);
    }
});

module.exports = router;