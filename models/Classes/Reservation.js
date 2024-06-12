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

    static parse(data) {
        const nObject = new Reservations();
        const temp = data.reservationsForDay;
        for(let i = 0; i < data.length; i++) {
            nObject.reservationsForDay.push(Interval.parse(temp[i]));
        }
        console.log(nObject);
        return nObject;
    }
}

module.exports = Reservations;