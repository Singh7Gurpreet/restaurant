const Interval = require('./Intervals');
const Table = require('./Table');

class RestaurantTables {
    constructor() {
        this.tables =[];
        for(let i = 0; i < 10; i++) {
            if(i >= 0 && i <= 5) {
                this.tables.push(new Table.Table6(i));
            } else if (i > 5 && i <= 7  ) {
                this.tables.push(new Table.Table4(i));
            } else {
                this.tables.push(new Table.Table2(i));
            }
        }
    }

    _isAvailable6(interval) {
        for(let i = 0; i <= 5;i++) {
            if(this.tables[i].isBooked(interval) === false) {
                return i;
            }
        }
        return -1;
    }

    _isAvailable4(interval) {
        for(let i = 6; i < 8;i++) {
            if(this.tables[i].isBooked(interval) === false) {
                return i;
            }
        }
        return -1;
    }

    _isAvailable2(interval) {
        for(let i = 8; i <= 9;i++) {
            if(this.tables[i].isBooked(interval) === false) {
                return i;
            }
        }
        return -1;
    }

    isAvailable(interval,members) {
        if(members === 6) {
            return this._isAvailable6(interval);
            // return (this.isAvailable6(interval)||
            //       (this.isAvailable4(interval) && this.isAvailable2(interval)));
        } else if (members === 4) {
            return this._isAvailable4(interval);
            // return  (this.isAvailable6(interval) ||
            //         this.isAvailable4(interval) || 
            //        (this.isAvailable2(interval) && this.isAvailable2(interval)));
        } else  {
            return this._isAvailable2(interval);
            // return this.isAvailable6(interval) ||
            //        this.isAvailable4(interval) || 
            //        this.isAvailable2(interval);
        }
    }

    book(interval,members) {
        let tableId = this.isAvailable(interval,members);
        if (tableId != -1) {
            this.tables[tableId].bookRequest(interval);
            return tableId;
        }
        return -1;
    }

    toJSON() {
        return {
            tables: this.tables.map(t => t.toJSON())
        }
    }
    static parse(data) {
        const temp = new RestaurantTables();
        const m = [];
        for(let i = 0; i < data.tables.length; i++ ){
            m.push(Table.Table.parse(data.tables[i]));
        }
        temp.tables = m;
        return temp;
    }
}

module.exports = RestaurantTables;