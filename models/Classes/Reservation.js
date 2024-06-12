const Interval = require('./Intervals');

class Reservations {
    constructor () {
        this.reservationsForDay = [];
    }

    canInsert(interval) {
        if(this.reservationsForDay.length === 0) return true;
        for(const bookedIntervals of this.reservationsForDay) {
            if(bookedIntervals.overlaps(interval) || interval.overlaps(bookedIntervals)){
                return false;
            }
        }
        return true;
    }

    insert(interval) {
        if(this.canInsert(interval) === true){
            this.reservationsForDay.push(interval);
            this.reservationsForDay.sort((a,b) => Interval.isGreater(a,b));
            return true;
        }
        return false;
    } 
    getReservations(){
        return this.reservationsForDay;
    }

    toJSON () {
        return {
            reservationsForDay: this.reservationsForDay.map(interval => interval.toJSON())
        }
    }
}

const temp = new Reservations();
console.log(JSON.stringify(temp));
module.exports = Reservations;