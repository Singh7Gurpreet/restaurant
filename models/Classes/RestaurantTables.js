const Interval = require('./Intervals');
const TablesClass = require('./Tables');

class RestaurantTables {
    constructor() {
        this.tables =[];
        for(let i = 0; i < 10; i++) {
            if(i >= 0 && i < 5) {
                this.tables.push(new TablesClass.Tables6(i));
            } else if (i >= 5 && i < 7  ) {
                this.tables.push(new TablesClass.Tables4(i));
            } else {
                this.tables.push(new TablesClass.Tables2(i));
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
}

module.exports = RestaurantTables;