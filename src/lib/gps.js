const haversine = require('haversine-distance');

const earthRadius = 6378.8; // in kms

/**
 * Converts degress to radians
 * @param {Number} deg
 * @returns {Number} rad
 */
function deg2Rad (deg) {
	return deg / (180 / Math.PI);
}

function getDistanceBetweenPoints (lat1, lon1, lat2, lon2) {
	const ptA = { latitude: lat1, longitude: lon1 };
	const ptB = { latitude: lat2, longitude: lon2 };
	return haversine(ptA, ptB);
}

/**
 *
 * @param {[[Number,Number]]} coordArray - lat, lon
 * @returns {number[]} list of distances covered
 */
function getDistancesBetweenPoints (coordArray) {
	const distances = [];
	for (let i = 0; i < coordArray.length - 1; i++) {
		const [lat1, lon1] = coordArray[i];
		const [lat2, lon2] = coordArray[i + 1];
		distances.push(getDistanceBetweenPoints(deg2Rad(lat1), deg2Rad(lon1), deg2Rad(lat2), deg2Rad(lon2)));
	}

	return distances;
}

/**
 * Calculates the distance covered by a list of gps coordinates
 * @param {[[Number,Number]]} coordArray - lat, lon
 * @returns {number} - sum of distances
 */
function gpsCoordsToDistance (coordArray) {
	if (!coordArray) return 0;
	let distance = 0;

	// slide over values and sum distances
	for (let i = 0; i < coordArray.length - 1; i++) {
		const [lat1, lon1] = coordArray[i];
		const [lat2, lon2] = coordArray[i + 1];
		distance += getDistanceBetweenPoints(lat1, lon1, lat2, lon2);
	}

	return distance;
}

module.exports = {
	gpsCoordsToDistance,
	getDistancesBetweenPoints,
	getDistanceBetweenPoints
};
