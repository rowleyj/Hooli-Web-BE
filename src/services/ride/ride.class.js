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
		const { gps, closePasses, times } = params;

		// create route
		const route = await this.app.service('route').create(
			{ coords: gps.coords, name: data.title },
			params
		);

		// create closePasses
		const createdClosePasses = await Promise.all(closePasses.map(async(closePass) => this.app.service('closePass').create(
			{
				passingDistance: closePass.passingDistance,
				timeOfPass: closePass.timing,
				geo: {
					type: 'Point',
					coords: closePass.coords
				}
			}
		)));
		const closePassIds = createdClosePasses.map(closePass => closePass._id);

		// get stats
		const weight = 100; // temp
		const stats = new RideStats(data.coords, weight, gps.delay);

		const ride = {
			routeId: route._id,
			title: data.title,
			userId: params.users._id,
			stats: {
				...stats.summary
			},
			closePasses: closePassIds,
			startTime: times.start,
			endTime: times.end
		};
		return super.create(ride, params);
	}

	async update (id, data, params) { }

	async patch (id, data, params) { }

	async remove (id, params) { }
};
