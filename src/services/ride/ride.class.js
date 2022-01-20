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
		// console.log(closePasses);
		const closePassCreationPromises = closePasses.map(async(closePass) => this.app.service('closePass').create(
			{
				passingDistances: closePass.passingDistances,
				timeOfPass: closePass.timeOfPass,
				geo: {
					type: 'Point',
					coords: closePass.coords
				}
			},
			{
				users: params.users
			}
		));
		const createdClosePasses = await Promise.all(closePassCreationPromises);
		const closePassIds = createdClosePasses.map(closePass => closePass._id);

		// get stats
		const weight = 100; // temp
		const stats = new RideStats(gps.coords, weight, gps.delay);

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
