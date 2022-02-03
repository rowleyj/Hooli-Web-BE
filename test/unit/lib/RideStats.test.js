const { expect } = require("chai");
const { RideStats } = require('../../../src/lib/RideStats');

const inputJSON = require('../../fixtures/exampleRideFile1.json');

const mockInput = {
	gpsCoords: inputJSON.gps.coords,
	weight: 85,
	gpsRefreshDelay: inputJSON.gps.delay
};

describe('RideStats Class', () => {
	it('should create a RideStats instance', () => {
		const stats = new RideStats(mockInput.gpsCoords, mockInput.weight, mockInput.gpsRefreshDelay);

		expect(stats).to.be.instanceOf(RideStats);
	});

	it('should correctly set state values', () => {
		const stats = new RideStats(mockInput.gpsCoords, mockInput.weight, mockInput.gpsRefreshDelay);

		expect(stats.gpsCoords).to.exist;
		expect(stats.gpsCoords).to.be.an('array');
		expect(stats.gpsCoords).to.eql(mockInput.gpsCoords);

		expect(stats.weight).to.equal(mockInput.weight);
		expect(stats.gpsRefreshDelayMs).to.equal(mockInput.gpsRefreshDelay);
	});

	describe('Methods', () => {
		const stats = new RideStats(mockInput.gpsCoords, mockInput.weight, mockInput.gpsRefreshDelay);
		let speeds;

		it('should return the distance covered', () => {
			const distance = stats.getDistance();
			expect(distance).to.be.a('number');
		});

		it('should return calories burned', () => {
			const distance = stats.getDistance();
			const calories = stats.getCaloriesBurned(distance);
			expect(calories).to.be.a('number');
		});

		it('should compute speeds', () => {
			speeds = stats.getSpeeds();

			speeds.forEach(speed => {
				expect(speed).to.be.a('number');
			});
		});

		it('should calculate movementTime', () => {
			const movementTime = stats.getMovementTime(speeds);

			expect(movementTime).to.be.a('number');
		});
	});
});
