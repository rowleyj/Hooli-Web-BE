const { Service } = require('feathers-mongoose');

exports.Users = class Users extends Service {
	async find (params) {
		const { data } = await this._find(params);
		return data;
	}
	async get (id, params) {
		const data = await this._get(id, params);
		return data;
	}
	async create (data, params) {
		console.log('i am here');
		console.log(data);
		return super.create(data, params);
	}
	async update (id, data, params) { }
	async patch (id, data, params) { }
	async remove (id, params) { }
};
