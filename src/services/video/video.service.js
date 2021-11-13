const { Video } = require('./video.class');
const createModel = require('../../models/video.model');
const hooks = require('./video.hooks');

module.exports = function (app) {
	const options = {
		Model: createModel(app),
		paginate: app.get('paginate')
	};

	// Initialize our service with any options it requires
	app.use('/video', new Video(options, app));

	// Get our initialized service so that we can register hooks
	const service = app.service('video');

	service.hooks(hooks);
};
