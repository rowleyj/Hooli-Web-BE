module.exports = function (app) {
	const modelName = 'vehicles';
	const mongooseClient = app.get('mongooseClient');
	const schema = new mongooseClient.Schema({
		licensePlate: { type: String },
		closePasses: { type: Number, default: 0 },
		// we could compute where repeat offenders generally pass (i.e. always on their street?)
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
