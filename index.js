
/**
 * Constructor
 * @param {Number} millispan the time horizon for this Rate (in ms.)
 */
var Rate = function (millispan) {
        this.span = millispan;
        this.events = [];
    };

/**
 * Register a hit. This method takes in the order of 0.06ms to run
 * with a time span of 1000ms.
 */
Rate.prototype.hit = function() {
    var i = 0,
        oldestEventIndex = 0,
        now = Date.now(),
        cutoffDate = now - this.span;

    this.events.push(now);
    for (; i < this.events.length; i++) {
        if (this.events[i] > cutoffDate) {
            oldestEventIndex = i;
            break;
        }
    }
    this.events = this.events.slice(oldestEventIndex);
};

/**
 * Returns the hit frequency.
 * @return  {Number} the frequency (in Hertz) at which Rate.prototype.hit
 *                   has been called in the past number of milliseconds
 *                   given in the constructor.
 */
Rate.prototype.getFrequency = function () {

    return this.events.length * 1000 / this.span;
};

module.exports = Rate;
