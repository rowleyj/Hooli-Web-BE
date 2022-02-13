const mongoose = require('mongoose');
const logger = require('./logger');

module.exports = async function (app) {
	mongoose.connect(
		app.get('mongodb'),
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	).catch(err => {
		logger.error(err);
		process.exit(1);
	});

	app.set('mongooseClient', mongoose);
};
