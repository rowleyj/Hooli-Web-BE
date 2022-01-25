const { expect } = require('chai');
const { Chance } = require('chance');
const app = require('../../src/app');

const chance = new Chance();

const testUser = {
	email: chance.email(),
	password: chance.string()
};

describe('ClosePass Service', () => {
	let closePass;
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

	it('should create a closePass - POST', async() => {
		const closePassData = {
			passingDistances: [1, 0.98, 1.2],
			timeOfPass: 15,
			geo: {
				type: 'Point',
				coords: [chance.longitude(), chance.latitude()]
			}
		};

		closePass = await app.service('closePass').create(closePassData, params);
		expect(closePass._id).to.exist;
		expect(closePass.passingDistances).to.have.members(closePassData.passingDistances);
		expect(closePass.timeOfPass).to.equal(closePassData.timeOfPass);
		expect(closePass.geo).to.eql(closePassData.geo);
	});

	it('should retrieve a closePass - GET', async() => {
		const closePassRetrieved = await app.service('closePass').get(closePass._id);

		expect(closePassRetrieved).to.eql(closePass);
	});

	it('should find a ride - GET w/query', async() => {
		const [closePassRetrieved] = await app.service('closePass').find({
			query: {
				timeOfPass: closePass.timeOfPass,
				geo: closePass.geo
			}
		});

		expect(closePassRetrieved).to.eql(closePass);
	});

	it('should update a ride - PUT', async() => {
		const update = { timeOfPass: 17.5, ...closePass };
		const closePassUpdated = await app.service('closePass').update(closePass._id, update);
		expect(closePassUpdated.timeOfPass).to.equal(update.timeOfPass);
	});
});
