const { Service } = require('feathers-mongoose');

exports.Users = class Users extends Service {
  async find(params) {}
  async get(id, params) {}
  async create(data, params) {}
  async update(id, data, params) {}
  async patch(id, data, params) {}
  async remove(id, params) {}
};
