const Interval = require('./Intervals');
const Reservation = require('./Reservation');

class Tables{
    constructor(members,id) {
        this.members = members;
        this.id = id;
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
    constructor(id) {
        super(2,id);
    }
}

class Tables4 extends Tables {
    constructor(id) {
        super(4,id);
    }
}

class Tables6 extends Tables {
    constructor(id) {
        super(6,id);
    }
}

module.exports = {Tables,Tables2,Tables4,Tables6};
