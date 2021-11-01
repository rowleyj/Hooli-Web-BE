// Initializes the `users` service on path `/users`
const { Vehicle } = require('./vehicle.class');
const createModel = require('../../models/vehicle.model');
const hooks = require('./vehicle.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/vehicle', new Vehicle(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('vehicle');

  service.hooks(hooks);
};
