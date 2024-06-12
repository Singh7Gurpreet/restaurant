const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/',(req,res,next)=>{
    res.render(path.join(__dirname,"../views/reservation"),{
        timeSlots:[1,2,3,4,5,6,6,6,6,6,6,6,6,6]
    });
})

router.post('/request',(req,res,next) => {
    console.log(req.body);
    res.sendStatus(200);
})

module.exports = router;