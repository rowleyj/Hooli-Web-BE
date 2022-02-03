const { expect } = require("chai");
const { gpsCoordsToDistance } = require("../../../src/lib/gps");

const inputJSON = require('../../fixtures/exampleRideFile1.json');

const gpsCoords = inputJSON.gps.coords;
const brantford = {
	latitude: 43.17973880663397,
	longitude: -80.25031553186767
};
const hamilton = {
	latitude: 43.26038311041402,
	longitude: -79.89600644983642
};

describe('GPS Lib', () => {
	describe('Converting lat lon array to distance', () => {
		it('should properly calculate distance between a set of points', () => {
			const coordArray = [
				[brantford.latitude, brantford.longitude],
				[hamilton.latitude, hamilton.longitude]
			];
			const distance = gpsCoordsToDistance(coordArray);
			expect(distance).to.be.a('number');
			expect(distance).to.equal(30111.49232940065);
		});

		it('should return total distance between sequence of points', () => {
			const totalDistance = gpsCoordsToDistance(gpsCoords);
			expect(totalDistance).to.be.a('number');
		});
	});
});
