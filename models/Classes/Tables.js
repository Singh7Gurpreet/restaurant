const Interval = require('./Intervals');
const Reservations = require('./Reservation');

class Tables{
    constructor(members,id) {
        this.members = members;
        this.reservation = new Reservations();
        this.id = id;
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

    toJSON() {
        return {
            members:this.members,
            reservation:this.reservation,
            id:this.id
        }
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
