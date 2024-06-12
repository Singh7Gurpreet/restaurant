function generateTimeSlots() {
    const timeSlots = [];
    let i = 9;
    let halfHourFlag = false;
    while(i <= 21) {
        if( i === 21 && halfHourFlag) break;
        let temp = "";
        let halfHour = halfHourFlag?":30":":00";
        let period = i<12?"AM":"PM";
        if(i > 12) {
            temp = `${i%12}${halfHour} ${period}`;
        } else {
            temp = `${i}${halfHour} ${period}`;
        }
        if(halfHourFlag == false) {
            halfHourFlag = true;
        } else {
            halfHourFlag = false;
            i++;
        }
        timeSlots.push(temp);
    }
    return timeSlots;
}

function generateAvailableDates() {
    const dates = [];
    
    for(let i = 1; i < 15; i++) {
        let today = new Date();
        today.setDate(today.getDate() + i);
        let buffer = today.toDateString().split(' ');
        let temp = `${buffer[2]} ${buffer[1]}`;
        dates.push(temp);
    }

    return dates;
}

module.exports = {generateTimeSlots,generateAvailableDates};