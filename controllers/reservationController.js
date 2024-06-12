const express = require('express');
const router = express.Router();
const path = require('path');

const {generateTimeSlots,generateAvailableDates} = require("../services/dateTime/dayTimeGen");
const {bookTable} = require('../models/booker');

router.get('/',(req,res,next)=>{
    const timeSlots = generateTimeSlots();
    const dates = generateAvailableDates();
    res.render(path.join(__dirname,"../views/reservation"),{
        timeSlots:timeSlots,
        daySlots:dates
    });
});

router.post('/request',(req,res,next) => {
    try {
        bookTable(req.body.time,req.body.day);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(404);
    }
});

module.exports = router;