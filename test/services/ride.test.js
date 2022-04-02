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
const inputRideFile = require('../fixtures/exampleRideFile1.json');

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

	it('should create a ride - POST', async() => {
		const createParams = {
			...params,
		};
		ride = await app.service('ride').create({ ...testRide, ride: { ...inputRideFile } }, createParams);

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

	it('should retrieve a ride - GET', async() => {
		const rideRetreived = await app.service('ride').get(ride._id);

		expect(rideRetreived).to.eql(ride);
	});

	it('should find a ride - GET w/query', async() => {
		const [rideRetrieved] = await app.service('ride').find({
			query: {
				title: ride.title
			}
		});
		expect(rideRetrieved.title).to.equal(ride.title);
	});

	it('should update a ride - PUT', async() => {
		const update = { title: chance.sentence(), ...ride };
		const rideUpdated = await app.service('ride').update(ride._id, update);
		expect(rideUpdated.title).to.equal(update.title);
	});
});
