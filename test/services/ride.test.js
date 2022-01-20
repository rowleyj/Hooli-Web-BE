const { expect } = require('chai');
const { Chance } = require('chance');
const fs = require('fs');
const app = require('../../src/app');
const { RideFile } = require('../../src/lib/RideFile');

const chance = new Chance();

const testRide = {
	title: chance.string(),
	description: chance.sentence(),
	videoUrl: chance.string(),
};
const testUser = {
	email: chance.email(),
	password: chance.string()
};
const inputRideFile = fs.readFileSync('./test/fixtures/exampleRideFile.json');

/**
 * Parses a ride file and returns in formatted params mocking middleware
 * @param {File} file - ride file to parse
 * @returns {object}
 */
const fileToParams = (file) => {
	const rideFile = new RideFile(file);
	return {
		closePasses: rideFile.computeClosePasses(),
		gps: rideFile.data.gps,
		times: {
			start: rideFile.data.start,
			end: rideFile.data.end
		}
	};
};

describe('\'ride\' service', () => {
	let ride;
	let user;
	let params;

	before(async () => {
		user = await app.service('users').create(testUser);
		params = {
			...params, users: user
		};
	});

	after(async() => {
		if (user) await app.service('users').remove(user._id);
	});

	it('registered the service', () => {
		const service = app.service('ride');

		expect(service).to.exist;
	});

	it.only('should create a ride - POST', async() => {
		const createParams = {
			...params,
			...fileToParams(inputRideFile)
		};
		// console.log(createParams);
		ride = await app.service('ride').create(testRide, createParams);

		expect(ride.title).to.equal(testRide.title);
		expect(ride.routeId).to.exist;
		expect(ride.userId).to.exist;
		const { stats } = ride;
		expect(stats.speeds).to.have.length.greaterThan(0);
		expect(stats.distance).to.be.greaterThan(0);
		expect(stats.caloriesBurned).to.be.greaterThan(0);
		expect(stats.avgSpeed).to.be.greaterThan(0);
		expect(stats.movementTimeMs).to.be.greaterThan(0);
	});

	// it('should retrieve a ride - GET', async() => {
	// 	const rideRetreived
	// })
});
