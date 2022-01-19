const { expect } = require("chai");
const fs = require('fs');
const { RideFile } = require('../../../src/lib/RideFile');

const inputFile = fs.readFileSync('./test/fixtures/exampleRideFile.json');

describe('RideFile class', () => {
	it('should create a RideFile instance', () => {
		const rideFile = new RideFile(inputFile);

		expect(rideFile).to.be.instanceOf(RideFile);
	});

	it('should correctly parse the input file', () => {
		const rideFile = new RideFile(inputFile);

		const { data } = rideFile;
		expect(data).to.exist;
		expect(data.start).to.equal(1);
		expect(data.end).to.equal(2);
		expect(data.gps.coords).to.be.an('array');
	});

	describe('Getters', () => {
		const rideFile = new RideFile(inputFile);

		it('should return distance sensor delay', () => {
			expect(rideFile.distanceSensorDelay).to.equal(100);
		});

		it('should return gps sensor delay', () => {
			expect(rideFile.gpsSensorDelay).to.equal(150);
		});
	});

	describe.only('Methods', () => {
		const rideFile = new RideFile(inputFile);

		it('should compute close passes', () => {
			const closePasses = rideFile.computeClosePasses();
			expect(closePasses).to.have.length(2);
			closePasses.forEach(({ timeOfPass, coords, passingDistance }) => {
				// at least one of the sensors should have sensed distance less than 1m
				passingDistance.sort((a, b) => a - b);
				expect(passingDistance[0]).to.be.lessThan(1);

				expect(timeOfPass).to.be.greaterThan(0);
				expect(coords).to.have.length(2);
			});
		});
	});
});
