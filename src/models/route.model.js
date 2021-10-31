const { ObjectId } = mongoose.Schema.Types;

// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const modelName = 'route';
	const mongooseClient = app.get('mongooseClient');
	const schema = new mongooseClient.Schema({
		userId: {
			type: ObjectId,
			required: true
		},
		// to conver gpx to geojson look here: https://www.npmjs.com/package/@tmcw/togeojson
		geo: {
			type: Object, index: '2dsphere'
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
