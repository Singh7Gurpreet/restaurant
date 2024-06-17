const stripe = require("stripe").Stripe(process.env.STRIPE_KEY);
const router = require("express").Router();

router.get('/',async (req,res) => {
    console.log((req.session.cart));
    // const {amount,currency,items} = req.body;
    // try {
    //     const session = await stripe.checkout.sessions.create({
    //         payment_method_types:['card'],
    //         line_items: items.map(item=>({
    //             price_data:{
    //                 currency:currency,
    //                 product_data:{
    //                     name:item.name,
    //                 },
    //                 unit_amount:item.price*100,
    //             },
    //             quantity:1,
    //         })),
    //         mode: 'payment',
    //         success_url:'http://www.google.com',
    //         cancel_url: 'http://www.youtube.com'
    //     });
    //     res.json({id:session.url});
    // } catch (error) {
    //     res.status(500).json({ error: error.message });
    //   }
    res.status(400);
});

module.exports = router;