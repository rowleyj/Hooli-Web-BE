const { Service } = require('feathers-mongoose');

exports.ClosePass = class ClosePass extends Service {
	async find (params) { }

	async get (id, params) { }

	/**
	 * Handles /POST closepass
	 * @param {*} data
	 * @param {*} params
	 */
	async create (data, params) {
		console.log('at create closepass');
		console.log(data, params);
		const closePass = {
			...data,
			userId: params.users._id
		};
		return super.create(closePass, params);
	}

	async update (id, data, params) { }

	async patch (id, data, params) { }

	async remove (id, params) { }
};
