const { Service } = require('feathers-mongoose');
const { RideStats } = require('../../lib/RideStats');
const { RideFile } = require('../../lib/RideFile');

exports.Ride = class Ride extends Service {
	constructor(options, app) {
		super(options, app);
		this.app = app;
	}

	async find (params) {
		const { data } = await this._find(params);
		return data;
	}

	async get (id, params) {
		const data = await this._get(id, params);
		return data;
	}

	async create (data, params) {
		const rideFile = new RideFile(data.ride);

		const closePasses = rideFile.computeClosePasses();
		const { gps } = rideFile.data;
		const times = {
			start: rideFile.data.start,
			end: rideFile.data.end
		};

		// create route
		const route = await this.app.service('route').create(
			{ coords: gps.coords, name: data.title },
			params
		);

		// create closePasses
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
			videoUrl: data.videoUrl,
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

	async update (id, data, params) {
		const user = this._update(id, data, params);
		return user;
	}

	async remove (id, params) {
		return super.remove(id, params);
	}
};
