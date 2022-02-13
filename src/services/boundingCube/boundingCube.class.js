const { Service } = require('feathers-mongoose');

exports.BoundingCube = class BoundingCube extends Service {
	/**
	 * Handles /GET for multiple boundingCubes
	 * @param {*} params
	 * @returns
	 */
	async find (params) {
		const { data } = await this._find(params);
		return data;
	}

	/**
	 * Handles /GET for single boundingCube
	 * @param {*} id
	 * @param {*} params
	 * @returns
	 */
	async get (id, params) {
		const data = await this._get(id, params);
		return data;
	}

	/**
	 * Handles /POST boundingCube
	 * @param {*} data
	 * @param {*} params
	 */
	async create (data, params) {
		// console.log('at create!', data);
		return super.create(data, params);
	}

	/**
	 * Handles /PUT boundingCube
	 * @param {*} id
	 * @param {*} data
	 * @param {*} params
	 * @returns
	 */
	async update (id, data, params) {
		const boundingCube = this._update(id, data, params);
		return boundingCube;
	}

	/**
	 * Handles /DELETE boundingCube
	 * @param {*} id
	 * @param {*} params
	 * @returns
	 */
	async remove (id, params) {
		return super.remove(id, params);
	}
};
