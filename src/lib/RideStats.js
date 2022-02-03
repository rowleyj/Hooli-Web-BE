const gps = require('./gps');

class RideStats {
	constructor(gpsCoords, weight, gpsRefreshDelayMs = 500) {
		this.gpsCoords = gpsCoords;
		this.weight = weight;
		this.gpsRefreshDelayMs = gpsRefreshDelayMs;
	}

	get summary() {
		const speeds = this.getSpeeds();
		const distance = this.getDistance();
		return {
			speeds,
			avgSpeed: speeds.reduce((sum, speed) => sum + speed, 0) / speeds.length,
			distance,
			movementTimeMs: this.getMovementTime(speeds, 5),
			elapsedTime: this.gpsCoords.length * this.gpsRefreshDelayMs,
			caloriesBurned: this.getCaloriesBurned(distance)
		};
	}

	getDistance() {
		return gps.gpsCoordsToDistance(this.gpsCoords);
	}

	/**
	 * Returns an approximate number of calories burned
	 * Adjusted values based on calories/distance from here: https://captaincalculator.com/health/calorie/calories-burned-cycling-calculator/
	 * @param {number} distance
	 */
	getCaloriesBurned(distance) {
		const weightFactor = 21 / 54; // calories per km / weight in kg
		return weightFactor * this.weight * (distance / 1000);
	}

	/**
	 * Iterates over speeds and accumulates time when movement happened
	 * @param {number[]} speeds
	 * @param {number} minSpeedThreshold - minimum speed (km/h) before we expect no movement happened
	 * @returns {number} movement time in milliseconds
	 */
	getMovementTime(speeds, minSpeedThreshold = 5) {
		let movementTime = 0;
		speeds.forEach(speed => {
			if (speed > minSpeedThreshold) {
				movementTime += this.gpsRefreshDelayMs;
			}
		});

		return movementTime;
	}

	/**
	 * Calculates the distance covered between gps pings and uses that to calculate speed
	 * speed = distance/refreshTime
	 */
	getSpeeds() {
		const distancesCoveredBetweenPings = gps.getDistancesBetweenPoints(this.gpsCoords);

		const gpsRefreshDelaySeconds = this.gpsRefreshDelayMs / 1000;

		const metersPerSecToKmPerHr = (mPerSec => mPerSec * 3.6);
		const speeds = distancesCoveredBetweenPings.map(distanceInM => metersPerSecToKmPerHr(distanceInM / gpsRefreshDelaySeconds));

		return speeds;
	}
}

module.exports = {
	RideStats
};
