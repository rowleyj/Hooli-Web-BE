const { Service } = require('feathers-mongoose');

exports.Route = class Route extends Service {
	async find (params) { }
	async get (id, params) { }
	/**
	 * 
	 * @param {Object} data - packaged data to create a route with
	 * @param {Object} params - authentication, and user data from server hooks
	 * @returns {Object} newly created route
	 */
	async create (data, params) {
		// package into mongo linestring: https://geojson.org/geojson-spec.html#linestring
		const route = {
			geo: {
				type: 'LineString',
				coordinates: data.coords,
			},
			name: data.name,
			userId: params.users._id
		}
		console.log(route);
		return super.create(route, params);
	}
	async update (id, data, params) { }
	async patch (id, data, params) { }
	async remove (id, params) { }
};
