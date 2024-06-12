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

    toJSON() {
        return {
            start:this.start,
            end:this.end,
            id:this.id
        }
    }
    static parse(data) {
        return new Interval(data.start,data.end,data.id);
    }
}



module.exports = Interval;

