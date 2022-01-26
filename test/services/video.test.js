const { expect } = require('chai');
const { Chance } = require('chance');
const app = require('../../src/app');

const chance = new Chance();

const testUser = {
	email: chance.email(),
	password: chance.string()
};

describe('Video Service', () => {
	let video;
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
		const service = app.service('video');

		expect(service).to.exist;
	});

	it('should create a video - POST', async() => {
		const videoData = {
			title: chance.string(),
		};
		const createParams = {
			...params,
			file: {
				filename: 'test_file.mp4',
				destination: './public/hawaii'
			}
		};

		video = await app.service('video').create(videoData, createParams);
		expect(video._id).to.exist;
		expect(video.title).to.equal(videoData.title);
	});

	it('should retrieve a video - GET', async() => {
		const videoRetrieved = await app.service('video').get(video._id);

		expect(videoRetrieved).to.eql(video);
	});

	it('should find a video - GET w/query', async() => {
		const [videoRetrieved] = await app.service('video').find({
			query: {
				title: video.title
			}
		});
		expect(videoRetrieved.title).to.equal(video.title);
	});

	it('should update a video - PUT', async() => {
		const update = { title: 'New name!', ...video };
		const videoUpdated = await app.service('video').update(video._id, update);
		expect(videoUpdated.title).to.equal(update.title);
	});

	it('should remove a video - DELETE', async() => {
		const videoRemoved = await app.service('video').remove(video._id);
		expect(videoRemoved).to.eql(video);
	});
});
