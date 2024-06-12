const express = require('express');
const router = express.Router();
const path = require('path');

const {generateTimeSlots,generateAvailableDates} = require("../services/dateTime/dayTimeGen");
const RestaurantTables = require('../models/Classes/RestaurantTables');


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
        //was working on this just reminding my self :)
        // reserveTable(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(404);
    }
});

module.exports = router;