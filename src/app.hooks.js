// Application hooks that run for every service

module.exports = {
	before: {
		all: [],
		find: [],
		get: [],
		create: [() => console.log('creating')],
		update: [],
		patch: [],
		remove: []
	},

	after: {
		all: [],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	},

	error: {
		// all: [(e) => console.log('error occured', e)],
		find: [],
		get: [],
		create: [],
		update: [],
		patch: [],
		remove: []
	}
};
