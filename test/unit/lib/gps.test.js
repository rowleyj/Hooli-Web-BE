const { expect } = require("chai");
const { gpsCoordsToDistance } = require("../../../src/lib/gps");

describe('GPS Lib', () => {
	describe('Converting lat lon array to distance', () => {
		it('should properly calculate distance between a set of points', () => {
			const coordArray = [[53.32055, -1.72972], [53.31861, -1.69972]];

			expect(gpsCoordsToDistance(coordArray)).to.be.equal(2.006768618764435);
			expect(gpsCoordsToDistance(coordArray)).to.exist;
		});
	});
});
