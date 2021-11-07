const { Ride } = require('./ride.class');
const createModel = require('../../models/ride.model');
const hooks = require('./ride.hooks');

module.exports = function (app) {
	const options = {
		Model: createModel(app),
		paginate: app.get('paginate')
	};

	// Initialize our service with any options it requires
	app.use('/ride', new Ride(options, app));

	// Get our initialized service so that we can register hooks
	const service = app.service('ride');

	service.hooks(hooks);
};
