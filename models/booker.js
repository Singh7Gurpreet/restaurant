const RestaurantTables = require('./Classes/RestaurantTables');
const {bookInDatabase} = require('./bookerHelper');

function extractTime(time) {
    let period = time.split(' ')[1];
    let hrsMin = time.split(' ')[0];
    let temp = hrsMin.split(':')[0] + hrsMin.split(':')[1]; 
    time = +(temp);
    if(period === "PM" && time != 1230 && time != 1200) time += 1200;
    return time;
}

function extractDay(day) {
    const today = new Date();
    const value = `${day} ${today.getFullYear()}`;
    return value;
}

//handles http request function
async function bookTable (timeData,dayData) {
    const time = extractTime(timeData);
    const day = extractDay(dayData);
    
    if(time < 900 || time > 2100) {
        throw Error("Not a valid time");
    }
    
    try{
        const retValue = await bookInDatabase(time,day);
        return retValue;
    }
   catch(err) {
        console.log(err.message);
        throw Error("Something wrong with book function");
   } 
}

module.exports = {bookTable};