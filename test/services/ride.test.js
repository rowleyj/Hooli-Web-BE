const { expect } = require('chai');
const { Chance } = require('chance');
const app = require('../../src/app');

const chance = new Chance();

const coords = Array(100).fill(0).map(() => [chance.longitude(), chance.latitude()]);
const testRide = {
	title: chance.string(),
	description: chance.sentence(),
	coords,
	videoUrl: chance.string(),
};
const testUser = {
	email: chance.email(),
	password: chance.string()
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
		ride = await app.service('ride').create(testRide, params);

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
