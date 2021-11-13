const closePass = require('./closePass/closePass.service.js');
const ride = require('./ride/ride.service.js');
const route = require('./route/route.service.js');
const users = require('./users/users.service.js');
const vehicle = require('./vehicle/vehicle.service.js');
const video = require('./video/video.service.js');

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
	//   app.configure(closePass);
	//   app.configure(ride);
	app.configure(route);
	app.configure(users);
	app.configure(video);
	//   app.configure(vehicle);
};
