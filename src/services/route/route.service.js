const { Route } = require('./route.class');
const createModel = require('../../models/route.model');
const hooks = require('./route.hooks');

module.exports = function (app) {
	const options = {
		Model: createModel(app),
		paginate: app.get('paginate')
	};

	// Initialize our service with any options it requires
	app.use('/route', new Route(options, app));

	// Get our initialized service so that we can register hooks
	const service = app.service('route');

	service.hooks(hooks);
};
