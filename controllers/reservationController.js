const express = require('express');
const router = express.Router();
const path = require('path');

const {generateTimeSlots,generateAvailableDates} = require("../services/dateTime/dayTimeGen");

router.get('/',(req,res,next)=>{
    const timeSlots = generateTimeSlots();
    const dates = generateAvailableDates();
    res.render(path.join(__dirname,"../views/reservation"),{
        timeSlots:timeSlots,
        daySlots:dates
    });
})

router.post('/request',(req,res,next) => {
    console.log(req.body);
    res.sendStatus(200);
})

module.exports = router;