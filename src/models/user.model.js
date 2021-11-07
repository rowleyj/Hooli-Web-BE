// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
	const modelName = 'user';
	const mongooseClient = app.get('mongooseClient');
	const schema = new mongooseClient.Schema({
		email: { type: String, unique: true, lowercase: true },
		password: { type: String },
		name: {
			type: String
		},
		height: {
			type: Number
		},
		weight: {
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