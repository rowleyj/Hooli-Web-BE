const { Service } = require('feathers-mongoose');

exports.Ride = class Ride extends Service {
	constructor(options, app) {
		super(options, app);
		this.app = app;
	}

	async find (params) { }
	async get (id, params) { }
	async create (data, params) {
		// create route
		let route = await this.app.service('route').create(
			{ coords: data.geoJSON, name: data.title },
			params
		)

		const ride = {
			routeId: route._id,
			title: data.title,
			userId: params.users._id
		}
		return super.create(ride, params);
	}
	async update (id, data, params) { }
	async patch (id, data, params) { }
	async remove (id, params) { }
};
