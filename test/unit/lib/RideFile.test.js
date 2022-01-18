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
});
