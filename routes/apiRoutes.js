const fs = require('fs');
const util = require('util');

module.exports = (app) => {
	app.get('/api/notes', function (req, res) {
		fs.readFile('./Develop/db/db.json', 'utf8', function (error, data) {
			console.log('data :>> ', data);
			res.json(JSON.parse(data));
		});
	});
	app.post('/api/notes', (req, res) => fs.appendFile('./Develop/db/db.json'));
};
