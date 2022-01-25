const { expect } = require('chai');
const { Chance } = require('chance');
const app = require('../../src/app');

const chance = new Chance();

const testUser = {
	email: chance.email(),
	password: chance.string()
};

describe('Route Service', () => {
	let route;
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
		const service = app.service('closePass');

		expect(service).to.exist;
	});

	it('should create a route - POST', async() => {
		const routeData = {
			name: chance.string(),
			coords: [[chance.longitude(), chance.latitude()], [chance.longitude(), chance.latitude()], [chance.longitude(), chance.latitude()]]
		};

		route = await app.service('route').create(routeData, params);
		expect(route._id).to.exist;
		route.geo.coordinates.forEach((coordPair, idx) => {
			expect(coordPair).to.have.members(routeData.coords[idx]);
		});
		expect(route.name).to.equal(routeData.name);
	});

	it('should retrieve a route - GET', async() => {
		const routeRetrieved = await app.service('route').get(route._id);

		expect(routeRetrieved).to.eql(route);
	});

	it('should update a route - PUT', async() => {
		const update = { name: 'New name!', ...route };
		const routeUpdated = await app.service('route').update(route._id, update);
		expect(routeUpdated.name).to.equal(update.name);
	});
});
