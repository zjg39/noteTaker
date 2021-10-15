const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {
    readFromFile,
    readAndAppend,
    writeToFile,
} = require('../../helpers/fsUtils');

notes.get('/', (req, res) => {
     readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});
notes.post('/', (req, res) => {
    const { title, text} = req.body;
    if(req.body){
        const anotherNote = {
            title,
            text,
            id: uuidv4()
        }
        readAndAppend(anotherNote, './db/db.json');
        res.json('You have made a new note.')
    }
})

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id !== noteId);
  
        writeToFile('./db/db.json', result);
  
        res.json('Later bro.');
      });
  });



module.exports = notes;