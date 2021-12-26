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
				console.log('there is the context', ctx);

				// generate token or get it

				// request to process video on FLASK
				// do not wait for response - POST /closepass endpoint will be called
				// PASS AUTH TOKEN TO FLASK AND BACK, or userid
				const base = 'http://127.0.0.1:5000' // for testing purposes, change to actual address when flask app gets deployed
				axios.post('/process_video', {
					input_video_path:'C:/Users/tnaguib/Documents/GitHub/Hooli-Net/src/modules/models/cars4.mp4', // for testing purposes, change to local address or google cloud link
					output_video_path:'C:/Users/tnaguib/Documents/GitHub/Hooli-Net/src/modules/models/cars_detection.avi', // for testing purposes, change to local address or google cloud link
					token:'abc123' // replace with generated token
				})
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
