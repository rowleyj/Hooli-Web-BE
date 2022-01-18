class RideFile {
	constructor(file) {
		this.data = JSON.parse(file);
	}

	computeClosePasses() {
		const { timings } = this.data.closePasses;
		const closePasses = timings.map(time => ({ timeOfPass: time, passingDistance: this.getPassingDistance(time) }));
		return closePasses;
	}

	getPassingDistance(time) {
		const { delay: gpsDelay, coords } = this.data.gps;

		const timeFromStart = 0;
		let i = 0;
		if (gpsDelay <= 0) throw Error('GPS delay malformed, should be above 0');
		// find point where our closePass timing from the laser sensors matches
		// our timing from our gps unit (or bisect the coordinates if not exact match)
		while (i < coords.length && timeFromStart < time) {
			if (time === timeFromStart) {
				return coords[i];
			}
			i++;
			time += gpsDelay;
		}

		if (i === coords.length - 1) throw Error('Timing mismatch, cannot provide coordinates for close pass');

		const prevCoord = coords[i - 1];
		const coord = coords[i];
		// take the average of the coordinate after and before
		return [(coord[0] + prevCoord[0]) / 2, (coord[1] + prevCoord[1]) / 2];
	}
}

module.exports = {
	RideFile
};
