const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const BoundingBox = new mongoose.Schema({
	x: Number,
	y: Number,
	x1: Number,
	y1: Number
}, { _id: false });

module.exports = function (app) {
	const modelName = 'boundingCube';
	const mongooseClient = app.get('mongooseClient');
	const schema = new mongooseClient.Schema({
		closePassId: {
			type: ObjectId,
		},
		vehicleId: {
			type: ObjectId,
			required: true
		},
		videoUrl: {
			type: String
		},
		start: {
			type: Number
		},
		end: {
			type: Number
		},
		boxes: [BoundingBox]
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
