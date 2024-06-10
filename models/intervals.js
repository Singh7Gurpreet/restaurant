class Interval {    
    constructor(start,end,id) {
        this.start = start;
        this.end = end;
        this.id = id;
    }
    
    giveLength() {
        return this.end - this.start;
    }

    overlaps(interval) {
        return this.start <= interval.end && this.end >= interval.start;
    }
    static isGreater(interval1,interval2) {
        if (interval1.start > interval2.start) return 1;
        if (interval1.start === interval2.start) return 0;
        return -1;
    }
}

class Reservations {
    constructor (date) {
        this.date = date;
        this.reservationsForDay = [];
    }

    _canInsert(interval) {
        if(this.reservationsForDay.length === 0) return true;
        for(const bookedIntervals of this.reservationsForDay) {
            if(bookedIntervals.overlaps(interval) || interval.overlaps(bookedIntervals)){
                return false;
            }
        }
        return true;
    }

    insert(interval) {
        if(this._canInsert(interval) === true){
            this.reservationsForDay.push(interval);
            this.reservationsForDay.sort((a,b) => Interval.isGreater(a,b));
        }
    } 
    getReservations(){
        return this.reservationsForDay;
    }
}

module.exports = {Reservations};

