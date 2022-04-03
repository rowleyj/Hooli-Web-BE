const multer = require('multer');

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
		req.feathers.file = req.file;
		next();
	});
};
