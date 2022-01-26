const { Service } = require('feathers-mongoose');

exports.Vehicle = class Vehicle extends Service {
	async find(params) {
		const { data } = await this._find(params);
		return data;
	}

	async get(id, params) {
		const data = await this._get(id, params);
		return data;
	}

	async create(data, params) {
		return super.create(data, params);
	}

	async update(id, data, params) {
		const vehicle = this._update(id, data, params);
		return vehicle;
	}

	async remove(id, params) {
		return super.remove(id, params);
	}
};
