/**
 * @typedef {Object} ClosePass
 * @property {number} passingDistance - distance of passing
 * @property {number} timeOfPass - time of closepass from laser sensor
 * @property {number[][]} coords - longitude, latitude pair
 */

class RideFile {
	/**
	 * Parses .json file and exposes methods to compute required information
	 * @param {File} file 
	 */
	constructor(file) {
		this.data = JSON.parse(file);
	}

	get distanceSensorDelay(){
		return this.distance.delay;
	}

	get gpsSensorDelay(){
		return this.gps.delay;
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
	getClosePass(time){
		return {
			timeOfPass: time,
			coords: this.getClosePassCoords(time),
			passingDistance: this.getPassingDistance(time)
		}
	}

	/**
	 * Finds the corresponding coordinates for a closepass time
	 * @param {number} time 
	 * @returns {number[][]} longitude, latitude pair
	 */
	getClosePassCoords(time) {
		const { delay: gpsDelay, coords } = this.data.gps;

		let i = this.timeToIndex(gpsDelay, time)

		if (i === coords.length) throw Error('Timing mismatch, cannot provide coordinates for close pass');

		const prevCoord = coords[i - 1];
		const coord = coords[i];
		// take the average of the coordinate after and before
		return [(coord[0] + prevCoord[0]) / 2, (coord[1] + prevCoord[1]) / 2];
	}

	getPassingDistance(time) {
		let {sensor1, sensor2, sensor3} = this.data.distance;
		let idx = this.timeToIndex(this.distanceSensorDelay, time);

		// if(i === sensor1.length || i === sensor2.length || i === sensor)
		let distances = [ this.packageSensorDistance(sensor1[idx], 1), this.packageSensorDistance(sensor2[idx], 2), this.packageSensorDistance(sensor3[idx], 3)];

		// assume the smallest distance is the passing distance
		distances.sort((a,b) => a.distance - b.distance);
		return distances[0];
	}

	/**
	 * Packages sensor distance with sensor number to maintian data for potential directional computation
	 * @param {number} distance 
	 * @param {number} sensorNumber 
	 * @returns {object}
	 */
	packageSensorDistance(distance, sensorNumber){
		return {
			distance, sensor: sensorNumber
		}
	}

	/**
	 * Finds the matching index or index directly after the given time for sensor arrays with different delay timings
	 * @param {number} delayTime 
	 * @param {number} timeOfEvent 
	 * @returns {number} - index
	 */
	timeToIndex(delayTime, timeOfEvent){
		if (delayTime <= 0) throw Error('GPS delay malformed, should be above 0');

		return Math.ceil(timeOfEvent/delayTime);
	}
}

module.exports = {
	RideFile
};
