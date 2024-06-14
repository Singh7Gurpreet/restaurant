const express = require('express');
const router = express.Router();
const path = require('path');

const {generateTimeSlots,generateAvailableDates} = require("../services/dateTime/dayTimeGen");
const {bookTable} = require('../models/booker');
const { getName } = require('../services/authentication/credentials');

router.get('/',async (req,res,next)=>{
    const timeSlots = generateTimeSlots();
    const dates = generateAvailableDates();
    const t = await getName(req.cookies.token);
    res.render(path.join(__dirname,"../views/public/reservation"),{
        name:t,
        timeSlots:timeSlots,
        daySlots:dates
    });
});

router.post('/request',async (req,res,next) => {
    try {
        let t = await bookTable(req.body.time,req.body.day);
        res.sendStatus(t === true ? 200 : 404);
    } catch (error) {
        res.sendStatus(404);
    }
});

module.exports = router;