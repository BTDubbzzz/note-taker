const fs = require('fs');
const util = require('util');
const notesArray = require('../Develop/data/noteData');

module.exports = (app) => {
	app.get('/api/notes', function (req, res) {
		fs.readFile('./Develop/db/db.json', 'utf8', function (error, data) {
			res.json(JSON.parse(data));
		});
	});
	app.post('/api/notes', function (req, res) {
		const newNote = req.body;
		newNote.id = Math.floor(Math.random() * 1000000);
		console.log('newNote :>> ', newNote);
		notesArray.push(newNote);
		fs.writeFile('./Develop/db/db.json', JSON.stringify(notesArray), (err) => {});
		res.json(newNote);
	});
};
