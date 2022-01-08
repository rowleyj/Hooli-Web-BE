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
	let innerVal = (Math.sin(lat1) * Math.sin(lat2)) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1)
	return earthRadius * Math.acos(innerVal);
}

/**
 * 
 * @param {[[Number,Number]]} coordArray - lat, lon
 * @returns {number[]} list of distances covered
 */
function getDistancesBetweenPoints (coordArray){
	let distances = [];
	for (let i = 0; i < coordArray.length - 1; i++) {
		let [lat1, lon1] = coordArray[i];
		let [lat2, lon2] = coordArray[i + 1];
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
		let [lat1, lon1] = coordArray[i];
		let [lat2, lon2] = coordArray[i + 1];
		distance = distance + getDistanceBetweenPoints(deg2Rad(lat1), deg2Rad(lon1), deg2Rad(lat2), deg2Rad(lon2));
	}

	return distance;
}


module.exports.gpsCoordsToDistance = gpsCoordsToDistance;