const { authenticate } = require('@feathersjs/authentication').hooks;
const axios = require('axios');

module.exports = {
	before: {
		all: [],
		find: [authenticate('jwt')],
		get: [authenticate('jwt')],
		create: [authenticate('jwt')],
		update: [authenticate('jwt')],
		patch: [authenticate('jwt')],
		remove: [authenticate('jwt')]
	},

	after: {
		all: [],
		find: [],
		get: [],
		create: [
			(ctx) => {
				console.log('info: sending to ml pipeline', ctx.params.authentication.accessToken);
				// tell ML server to process insights
				axios.get('http://localhost:5000/process_video', {
					params: {
						token: ctx.params.authentication.accessToken
					}
				});
			}

		],
		update: [],
		patch: [],
		remove: []
	},

	error: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
};
