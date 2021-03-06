const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const modelName = 'ride';
	const mongooseClient = app.get('mongooseClient');
	const schema = new mongooseClient.Schema({
		userId: {
			type: ObjectId,
			required: true
		},
		closePasses: [ObjectId],
		title: {
			type: String
		},
		description: {
			type: String
		},
		fileURL: {
			type: String
		},
		routeId: {
			type: ObjectId,
			required: false
		},
		videoUrl: {
			type: String
		},
		startTime: Number,
		endTime: Number,
		stats: {
			caloriesBurned: Number,
			distance: Number,
			speeds: [Number],
			avgSpeed: Number,
			// totalClossPasses: Number, found via query
			elapsedTimeMs: Number,
			movementTimeMs: Number
		},
		meta: {
			gpsDelay: Number
		}
	}, {
		timestamps: true
	});

	// This is necessary to avoid model compilation errors in watch mode
	// see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
	if (mongooseClient.modelNames().includes(modelName)) {
		mongooseClient.deleteModel(modelName);
	}
	return mongooseClient.model(modelName, schema);
};
