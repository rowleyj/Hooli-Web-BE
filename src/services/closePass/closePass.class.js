const { Service } = require('feathers-mongoose');

exports.ClosePass = class ClosePass extends Service {
	async find (params) {
		const { data } = await this._find(params);
		return data;
	}

	async get (id, params) {
		const data = await this._get(id, params);
		return data;
	}

	/**
	 * Handles /POST closepass
	 * @param {*} data
	 * @param {*} params
	 */
	async create (data, params) {
		// expected Data -> {
		// 	passingDistances: closePass.passingDistances,
		// 	timeOfPass: closePass.timeOfPass,
		// 	geo: {
		// 		type: 'Point',
		// 		coords: closePass.coords
		// 	}
		// },
		const closePass = {
			...data,
			userId: params.users._id
		};
		return super.create(closePass, params);
	}

	async update (id, data, params) {
		const user = this._update(id, data, params);
		return user;
	}

	// async patch (id, data, params) { }

	async remove (id, params) {
		return super.remove(id, params);
	}
};
