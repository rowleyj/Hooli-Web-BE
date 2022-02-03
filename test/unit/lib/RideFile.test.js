const { expect } = require("chai");
const { RideFile } = require('../../../src/lib/RideFile');

const inputJSON = require('../../fixtures/exampleRideFile1.json');

describe('RideFile class', () => {
	it('should create a RideFile instance', () => {
		const rideFile = new RideFile(inputJSON);

		expect(rideFile).to.be.instanceOf(RideFile);
	});

	it('should correctly parse the input file', () => {
		const rideFile = new RideFile(inputJSON);

		const { data } = rideFile;
		expect(data).to.exist;
		expect(data.start).to.equal(1);
		expect(data.end).to.equal(2);
		expect(data.gps.coords).to.be.an('array');
	});

	describe('Getters', () => {
		const rideFile = new RideFile(inputJSON);

		it('should return distance sensor delay', () => {
			expect(rideFile.distanceSensorDelay).to.equal(100);
		});

		it('should return gps sensor delay', () => {
			expect(rideFile.gpsSensorDelay).to.equal(150);
		});
	});

	describe('Methods', () => {
		const rideFile = new RideFile(inputJSON);

		it('should compute close passes', () => {
			const closePasses = rideFile.computeClosePasses();
			expect(closePasses).to.have.length(2);
			closePasses.forEach(({ timeOfPass, coords, passingDistances }) => {
				// at least one of the sensors should have sensed distance less than 1m
				passingDistances.sort((a, b) => a - b);
				expect(passingDistances[0]).to.be.lessThan(1);

				expect(timeOfPass).to.be.greaterThan(0);
				expect(coords).to.have.length(2);
			});
		});
	});
});
