const fs = require('fs');
const uniqid = require('uniqid');
const notesDB = require('../Develop/db/db.json');

module.exports = (app) => {
	app.get('/api/notes', function (req, res) {
		fs.readFile('./Develop/db/db.json', 'utf8', function (error, data) {
			res.json(JSON.parse(data));
		});
	});
	app.post('/api/notes', function (req, res) {
		const newNote = req.body;
		newNote.id = uniqid();
		console.log('newNote.id :>> ', newNote.id);
		notesDB.push(newNote);
		fs.writeFile('./Develop/db/db.json', JSON.stringify(notesDB), (err) => {});
		res.json(newNote);
	});
	app.delete('/api/notes/:id', function (req, res) {
		for (let i = 0; i < notesDB.length; i++) {
			const noteID = notesDB[i].id;
			if (noteID === req.params.id) {
				notesDB.splice([i], 1);
			}
		}
		fs.writeFile('./Develop/db/db.json', JSON.stringify(notesDB), (err) => {});
		res.json(notesDB);
	});
};
