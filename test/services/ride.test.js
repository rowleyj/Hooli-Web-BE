const assert = require('assert');
const app = require('../../src/app');

describe('\'ride\' service', () => {
	it('registered the service', () => {
		const service = app.service('ride');

		assert.ok(service, 'Registered the service');
	});
});
