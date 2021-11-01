const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const modelName = 'closePass';
	const mongooseClient = app.get('mongooseClient');
	const schema = new mongooseClient.Schema({
		userId: {
			type: ObjectId,
			required: true
		},
		vehicleId: {
			type: ObjectId,
			required: true
		},
		videoUrl: {
			type: String
		},
		passingDistance: {
			type: Number,
			required: true
		},
		confidence: {
			type: Number,
			required: true
		},
		passingSpeed: {
			type: Number,
		},
		geo: {
			type: {
				type: String,
				enum: ['Point'],
				required: true
			},
			coords: {
				type: [Number],
				required: true
			}
		},
		timeOfPass: {
			type: Number
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
