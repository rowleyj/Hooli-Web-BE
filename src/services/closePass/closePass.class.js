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
		console.log(data, params);
		return super.create(data);
	}
	async update (id, data, params) { }
	async patch (id, data, params) { }
	async remove (id, params) { }
};
