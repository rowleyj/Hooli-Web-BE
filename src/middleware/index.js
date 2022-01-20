const multer = require('multer');
const { RideFile } = require('../lib/RideFile');

const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function (req, file, cb) {
		const filename = `${Date.now()}_${file.originalname}`;
		cb(null, filename);
	}
});
const multipartMiddleware = multer({
	storage: storage
});

module.exports = function (app) {
	// Add your custom middleware here. Remember that
	// in Express, the order matters.

	/**
	 * Middleware to upload files for video endpoint
	 */
	app.post('/video', multipartMiddleware.single('video'), (req, res, next) => {
		console.log('at middlewar');
		console.log(req.file);
		req.feathers.file = req.file;
		next();
	});

	/**
	 * Middleware to upload gpx file for ride endpoint
	 */
	app.post('/ride', multipartMiddleware.single('ride'), (req, res, next) => {
		// req.feathers.file = req.file;

		// with file parse need to pull out data
		// need data.coords from file
		// need closepass timings, passingDistance (from sensor arrays), and coords(from gps array based on timing)
		const rideFile = new RideFile(req.file);
		req.feathers.closePasses = rideFile.computeClosePasses();
		req.feathers.gps = rideFile.data.gps;
		req.feathers.times = {
			start: rideFile.data.start,
			end: rideFile.data.end
		};
		next();
	});
};
