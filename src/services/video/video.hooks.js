const { authenticate } = require('@feathersjs/authentication').hooks;


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
				console.log('there is the context', ctx);
				// try to put request to process video on FLASK here
				// do not wait for response - POST /closepass endpoint will be called
				// PASS AUTH TOKEN TO FLASK AND BACK, or userid
				// axios.post()
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
