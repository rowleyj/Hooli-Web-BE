const { Service } = require('feathers-mongoose');

exports.Video = class Video extends Service {
	async find (params) {
		// return this._find(params);
		const { data } = await this._find(params);
		return data;
	}

	async get (id, params) {
		const data = await this._get(id, params);
		return data;
	}

	/**
	 *
	 * @param {Object} data - packaged video
	 * @param {Object} params - authentication, and user data from server hooks
	 * @returns {Object} newly created route
	 */
	async create (data, params) {
		// rename file
		// const fileName = Data.now() + params.users._id;
		const { file } = params;
		let { destination, filename } = file;
		destination = destination.substring(9, destination.length);	// trim the ./public/ off the front
		const video = {
			url: `http://localhost:8080/${destination}${filename}`,
			title: data.title,
			userId: params.users._id
		};
		return super.create(video, params);
	}

	async update (id, data, params) {
		const video = this._update(id, data, params);
		return video;
	}

	// async patch (id, data, params) {
	// }

	async remove (id, params) {
		return this._remove(id, params);
	}
};
