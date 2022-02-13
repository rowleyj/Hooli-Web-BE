const { expect } = require('chai');
const { Chance } = require('chance');
const app = require('../../src/app');

const chance = new Chance();

const testUser = {
	email: chance.email(),
	password: chance.string()
};

const testClosePass = {
	passingDistances: [1, 0.98, 1.2],
	timeOfPass: 15,
	geo: {
		type: 'Point',
		coords: [chance.longitude(), chance.latitude()]
	}
};

const getBoundingBox = () => ({
	x: chance.integer(),
	y: chance.integer(),
	x1: chance.integer(),
	y1: chance.integer()
});

// Fill 100 bounding boxes
const boundingBoxes = new Array(100).fill(0).map(() => getBoundingBox());

describe('BoundingCube Service', () => {
	let boundingCube;
	let closePass;
	let user;
	let params;
	const boundingCubeData = {
		closePassId: null,
		// vehicleId: null,
		// videoUrl: null,
		start: 1,
		end: 10,
		boxes: boundingBoxes
	};

	// Create user and closepass (_id is required)
	before(async () => {
		user = await app.service('users').create(testUser);
		params = {
			...params, users: user
		};
		closePass = await app.service('closePass').create(testClosePass, params);
		boundingCubeData.closePassId = closePass._id;
	});

	after(async() => {
		if (user) await app.service('users').remove(user._id);
	});

	it('registered the service', () => {
		const service = app.service('boundingCube');

		expect(service).to.exist;
	});

	it('should create a boundingCube - POST', async() => {
		// console.log(boundingCubeData);
		boundingCube = await app.service('boundingCube').create(boundingCubeData, params);
		expect(boundingCube._id).to.exist;
		expect(boundingCube.boxes).to.have.deep.members(boundingCubeData.boxes);
		expect(boundingCube.start).to.equal(boundingCubeData.start);
		expect(boundingCube.end).to.equal(boundingCubeData.end);
		expect(boundingCube.closePassId).to.eql(closePass._id);
	});

	it('should retrieve a boundingCube - GET', async() => {
		const boundingCubeRetrieved = await app.service('boundingCube').get(boundingCube._id);

		expect(boundingCubeRetrieved).to.eql(boundingCube);
	});

	it('should find a boundingCube - GET w/query', async() => {
		const [boundingCubeRetrieved] = await app.service('boundingCube').find({
			query: {
				closePassId: closePass._id,
			}
		});

		expect(boundingCubeRetrieved).to.eql(boundingCube);
	});

	it('should update a boundingCube - PUT', async() => {
		const update = { start: 2, ...boundingCube };
		const boundingCubeUpdated = await app.service('boundingCube').update(boundingCube._id, update);
		expect(boundingCubeUpdated.start).to.equal(update.start);
	});
});
