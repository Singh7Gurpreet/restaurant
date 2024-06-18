const stripe = require("stripe").Stripe(process.env.STRIPE_KEY);
const router = require("express").Router();
const { Cursor } = require("mongoose");
const {getFoodById} = require('../models/food/foodData');

async function genItems(cart) {
    cart = JSON.parse(cart);
    // console.log(cart);
    const data = [];
    for(let i = 0; i < cart.length; i++) {
        let temp = await getFoodById(cart[i][0].foodid);
        temp = temp[0];
        let buffer = {
            price_data:{
                currency:"USD",
                product_data:{
                    name:temp.name,
                },
                unit_amount:+temp.price.split('$')[0]*100
            },
            quantity:cart[i][1]
        }
        data.push(buffer);
    }
    return data;
}

router.get('/',async (req,res) => {
    const items = await genItems(req.session.cart);
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            line_items: items,
            mode: 'payment',
            //handle success url and cancel_url
            success_url:'http://www.google.com',
            cancel_url: 'http://www.youtube.com'
        });
        res.send(session.url);
    } catch (error) {
        res.status(500).json({ error: error.message });
      }
    res.status(400);
});

module.exports = router;