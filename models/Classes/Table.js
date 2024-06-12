const Interval = require('./Intervals');
const Reservations = require('./Reservation');

class Table{
    constructor(members,id) {
        this.members = members;
        this.id = id;
        this.reservation = new Reservations();
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
            id:this.id,
            reservation:this.reservation
        }
    }

    static parse(data) {
        let table;
        if(data.members === 6) {
            table = new Table6();
        } else if(data.members === 4) {
            table = new Table4();
        } else {
            table = new Table2();
        }
        table.id = data.id;
        table.reservation = Reservations.parse(data.reservation.reservationsForDay);
        return table;
    }
}

class Table2 extends Table {
    constructor(id) {
        super(2,id);
    }
}

class Table4 extends Table {
    constructor(id) {
        super(4,id);
    }
}

class Table6 extends Table {
    constructor(id) {
        super(6,id);
    }
}

module.exports = {Table,Table2,Table4,Table6};
