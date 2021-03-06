const { Service } = require('feathers-mongoose');

exports.Route = class Route extends Service {
	// async find (params) { }
	async get (id, params) {
		const data = await this._get(id, params);
		return data;
	}

	/**
	 *
	 * @param {Object} data - packaged data to create a route with
	 * @param {Object} params - authentication, and user data from server hooks
	 * @returns {Object} newly created route
	 */
	async create (data, params) {
		// package into mongo linestring: https://geojson.org/geojson-spec.html#linestring
		// Mongo is expecting [longitude, latitude]
		const route = {
			geo: {
				type: 'LineString',
				coordinates: data.coords,
			},
			name: data.name,
			userId: params.users._id,
		};
		return super.create(route, params);
	}

	async update (id, data, params) {
		const route = this._update(id, data, params);
		return route;
	}

	// async patch (id, data, params) {
	// }

	async remove (id, params) {
		return super.remove(id, params);
	}
};
