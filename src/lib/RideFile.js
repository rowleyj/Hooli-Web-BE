/**
 * @typedef {Object} ClosePass
 * @property {number[]} passingDistances - distance of passing
 * @property {number} timeOfPass - time of closepass from laser sensor
 * @property {number[][]} coords - longitude, latitude pair
 */

class RideFile {
	/**
	 * Parses .json file and exposes methods to compute required information
	 * @param {File} file
	 */
	constructor(file) {
		this.data = { ...file };// JSON.parse(file);
	}

	get distanceSensorDelay() {
		return this.data.distance.delay;
	}

	get gpsSensorDelay() {
		return this.data.gps.delay;
	}

	/**
	 * Iterates over closePass timings and packages closePass data for database
	 * @returns {ClosePass[]}
	 */
	computeClosePasses() {
		const { timings } = this.data.closePasses;
		const closePasses = timings.map(time => this.getClosePass(time));
		return closePasses;
	}

	/**
	 * Computes and packages closepass data for single instance
	 * @param {number} time - timing of closepass from laser sensor
	 * @returns {ClosePass}
	 */
	getClosePass(time) {
		return {
			timeOfPass: time,
			coords: this.getClosePassCoords(time),
			passingDistances: this.getPassingDistances(time)
		};
	}

	/**
	 * Finds the corresponding coordinates for a closepass time
	 * @param {number} time
	 * @returns {number[][]} longitude, latitude pair
	 */
	getClosePassCoords(time) {
		const { delay: gpsDelay, coords } = this.data.gps;

		const i = this.timeToIndex(gpsDelay, time);
		const index = Math.floor(i);
		if (index === coords.length) throw Error('Timing mismatch, cannot provide coordinates for close pass');

		// if delay was exactly on index then return index
		if (index === i) { return coords[index]; }

		const prevWeight = Math.abs(i - index);
		const currWeight = 1 - prevWeight;
		const prevCoord = coords[index - 1];
		const coord = coords[index];
		// take the average of the coordinate after and before
		return [(currWeight * coord[0] + prevWeight * prevCoord[0]) / 2, (currWeight * coord[1] + prevWeight * prevCoord[1]) / 2];
	}

	/**
	 * Returns the list of distances at the time of a closepass
	 * Note that the distances will always be exactly on an index
	 * @param {number} time
	 * @returns {number[]}
	 */
	getPassingDistances(time) {
		const { sensor1, sensor2, sensor3 } = this.data.distance;
		const idx = Math.floor(this.timeToIndex(this.distanceSensorDelay, time));

		const distances = [sensor1[idx], sensor2[idx], sensor3[idx]];

		return distances;
	}

	/**
	 * Finds the matching index or index directly after the given time for sensor arrays with different delay timings
	 * @param {number} delayTime
	 * @param {number} timeOfEvent
	 * @returns {number} - index
	 */
	// eslint-disable-next-line class-methods-use-this
	timeToIndex(delayTime, timeOfEvent) {
		if (delayTime <= 0) throw Error('Delay malformed, should be above 0');

		return timeOfEvent / delayTime;
	}
}

module.exports = {
	RideFile
};
