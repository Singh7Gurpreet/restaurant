const Interval = require('./Intervals');
const Reservation = require('./Reservation');

class Tables{
    constructor(members) {
        this.members = members;
        const dt = new Date();
        const formattedDate = `${dt.getDay()}/${dt.getMonth()/dt.getFullYear()}`;
        this.reservation = new Reservation(formattedDate);
    }
    getMembers() {
        return this.members;
    } 

    isBooked(interval) {
        return !this.reservation.canInsert(interval);
    }

    bookRequest(interval) {
        if(this.isBooked(interval) === true) 
            return false;
        this.reservation.insert(interval);
        return true;
    }
}

class Tables2 extends Tables {
    constructor() {
        super(2);
    }
}

class Tables4 extends Tables {
    constructor() {
        super(4);
    }
}

class Tables6 extends Tables {
    constructor() {
        super(6);
    }
}

module.exports = {Tables,Tables2,Tables4,Tables6};
