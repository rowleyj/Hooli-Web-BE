const fs = require('fs');

const args = process.argv.slice(2);
if (args.length !== 1) {
	throw Error('Only accept 1 argument - filename');
}
const filename = args[0];

// eslint-disable-next-line import/no-dynamic-require
const ride = require(`./rideGPS/${filename}`);

const gpsPts = ride.map(({ lat, lng }) => [lat, lng]);

fs.writeFileSync(`./out-${filename}`, JSON.stringify(gpsPts));
