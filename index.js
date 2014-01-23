
/**
 * Constructor
 * @param {Number} millispan the time horizon for this Rate (in ms.)
 */
var Rate = function (millispan) {
		this.span = millispan;
		this.events = [];
	};

/**
 * Retrieves a frequency. This method itself takes in the order of 0.06ms to run
 * with a time horizon of 1000ms.
 * @return  {Number} the frequency (in Hertz) at which this method
*                        has been called in the past number of milliseconds
 *                        given in the constructor.
 */
Rate.prototype.getFrequency = function () {
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

	return this.events.length * 1000 / this.span;
};

module.exports = Rate;


var rate = new Rate(3000),
	tic = Date.now();
for (var j = 0; j < 100000; j++) {
	rate.getFrequency();
}

console.log('[rate.js:36] rate: ' + rate.getFrequency());
console.log('[rate.js:36] enlapsed: ' + ( Date.now() - tic));
