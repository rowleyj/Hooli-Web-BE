const { expect } = require('chai');
const { Chance } = require('chance');
const app = require('../../src/app');

const chance = new Chance();
const testUser = {
	email: chance.email(),
	password: chance.string()
};

describe('\'users\' service', () => {
	let user;

	after(async() => {
		if (user) await app.service('users').remove(user._id);
	});

	it('registered the service', () => {
		const service = app.service('users');
		expect(service).to.exist;
	});

	it('creates a user, encrypts password and adds gravatar', async () => {
		user = await app.service('users').create(testUser);

		// Makes sure the password got encrypted
		expect(user.password).to.not.equal(testUser.password);
	});

	it('should retrieve a user - GET', async() => {
		const userRetrieved = await app.service('users').get(user._id);

		expect(userRetrieved.email).to.equal(testUser.email);
	});

	it('should find a user - GET w/query', async() => {
		const [userRetrieved] = await app.service('users').find({
			query: {
				email: testUser.email
			}
		});
		expect(userRetrieved.email).to.equal(testUser.email);
	});

	it('should update a user - PUT', async() => {
		const update = { weight: 85, ...testUser };
		const userUpdated = await app.service('users').update(user._id, update);
		expect(userUpdated.weight).to.equal(update.weight);
		// updating a user should still encrpyt password
		expect(userUpdated.password).to.not.equal(testUser.password);
	});
});
