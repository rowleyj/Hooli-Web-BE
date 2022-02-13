const { BoundingCube } = require('./boundingCube.class');
const createModel = require('../../models/boundingCube.model');
const hooks = require('./boundingCube.hooks');

module.exports = function (app) {
	const options = {
		Model: createModel(app),
		paginate: app.get('paginate')
	};

	// Initialize our service with any options it requires
	app.use('/boundingCube', new BoundingCube(options, app));

	// Get our initialized service so that we can register hooks
	const service = app.service('boundingCube');

	service.hooks(hooks);
};
