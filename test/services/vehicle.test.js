const { expect } = require('chai');
const { Chance } = require('chance');
const app = require('../../src/app');

const chance = new Chance();

const testUser = {
	email: chance.email(),
	password: chance.string()
};

describe('Vehicle Service', () => {
	let vehicle;
	let user;

	before(async () => {
		user = await app.service('users').create(testUser);
	});

	after(async() => {
		if (user) await app.service('users').remove(user._id);
	});

	it('registered the service', () => {
		const service = app.service('vehicle');

		expect(service).to.exist;
	});

	it('should create a vehicle - POST', async() => {
		const vehicleData = {
			licensePlate: chance.string(),
		};

		vehicle = await app.service('vehicle').create(vehicleData);
		expect(vehicle._id).to.exist;
		expect(vehicle.licensePlate).to.equal(vehicleData.licensePlate);
		expect(vehicle.closePasses).to.equal(0);
	});

	it('should retrieve a vehicle - GET', async() => {
		const vehicleRetrieved = await app.service('vehicle').get(vehicle._id);

		expect(vehicleRetrieved).to.eql(vehicle);
	});

	it('should find a vehicle - GET w/query', async() => {
		const [vehicleRetrieved] = await app.service('vehicle').find({
			query: {
				licensePlate: vehicle.licensePlate
			}
		});
		expect(vehicleRetrieved.licensePlate).to.equal(vehicle.licensePlate);
	});

	it('should update a vehicle - PUT', async() => {
		const update = { closePasses: 1, ...vehicle };
		const vehicleUpdated = await app.service('vehicle').update(vehicle._id, update);
		expect(vehicleUpdated.closePasses).to.equal(update.closePasses);
	});

	it('should remove a vehicle - DELETE', async() => {
		const vehicleRemoved = await app.service('vehicle').remove(vehicle._id);
		expect(vehicleRemoved).to.eql(vehicle);
	});
});
