const { Service } = require('feathers-mongoose');
const { RideStats } = require('../../lib/RideStats');

exports.Ride = class Ride extends Service {
	constructor(options, app) {
		super(options, app);
		this.app = app;
	}

	async find (params) { }

	async get (id, params) { }

	async create (data, params) {
		// with file parse need to pull out data
		// need data.coords from file
		// need closepass timings, passingDistance (from sensor arrays), and coords(from gps array based on timing)

		// create route
		const route = await this.app.service('route').create(
			{ coords: data.coords, name: data.title },
			params
		);

		// create closePasses
		const closePasses = await Promise.all(data.closePasses.map(async(closePass) => this.app.service('closePass').create(
			{
				passingDistance: closePass.passingDistance,
				timeOfPass: closePass.timing,
				geo: {
					type: 'Point',
					coords: closePass.coords
				}
			}
		)));

		// get stats
		const weight = 100; // temp
		const gpsRefreshDelayMs = 500; // temp
		const stats = new RideStats(data.coords, weight, gpsRefreshDelayMs);

		const ride = {
			routeId: route._id,
			title: data.title,
			userId: params.users._id,
			stats: {
				...stats.summary
			}
		};
		return super.create(ride, params);
	}

	async update (id, data, params) { }

	async patch (id, data, params) { }

	async remove (id, params) { }
};
