// Initializes the `users` service on path `/users`
const { ClosePass } = require('./closePass.class');
const createModel = require('../../models/closePass.model');
const hooks = require('./closePass.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/closePass', new ClosePass(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('closePass');

  service.hooks(hooks);
};
