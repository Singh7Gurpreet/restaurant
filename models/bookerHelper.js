const {MongoClient} = require('mongodb');
const {Reservations} = require('./schemas');
const Interval = require('./Classes/Intervals');
const RestaurantTables = require('./Classes/RestaurantTables');
const uri = process.env.DB_URI;

async function insert(restaurantObject,time) {
    const timeSlot = new Interval(time,(time + 200),1);
    const tableId = restaurantObject.book(timeSlot,6);
    if( tableId != -1) {
        return tableId;
    } else {
        throw Error("Time slot not available");
    }
}

async function bookInDatabase(time, date) {
    try {
        let restaurantObject;

        // Find existing reservation for the date
        const existingReservation = await Reservations.findOne({ date: date });

        if (existingReservation) {
            // console.log(existingReservation,"\n========================\n");
            // Parse existing reservation data
            restaurantObject = JSON.parse(existingReservation.reservations);
            restaurantObject = RestaurantTables.parse(restaurantObject);
            // Delete existing reservation
            await Reservations.deleteOne({ date: date });
        } else {
            // Create new instance of RestaurantTables if no existing reservation
            restaurantObject = new RestaurantTables();
        }
        // console.log(JSON.stringify(restaurantObject));
        // Insert new booking into restaurantObject
        try { 
            await insert(restaurantObject, time);
        } catch (error) {
            console.log(error);
        }
        const buffer = JSON.stringify(restaurantObject);
        // console.log(buffer);
        // Save updated reservation data
        const updatedReservation = new Reservations({
            date: date,
            reservations: buffer
        });
        await updatedReservation.save();
        console.log('Booking saved successfully.');
    } catch (error) {
        console.error('Error booking in database:\n', error);
    }
}

module.exports = {bookInDatabase};