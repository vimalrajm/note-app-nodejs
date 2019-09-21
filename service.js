const fs = require('fs');
const chalk = require('chalk');

const addNotes = (title, body) => {
  let notes = getNotes();
  const noteExist = notes.filter( note => {
    return note.title === title;
  })
  if (noteExist.length) {
    console.log(chalk.red.inverse('Note already exist'));
  } else {
    notes.push({title,body});
    const dbData = JSON.stringify(notes);
    addNotesToDB(dbData);
    console.log(chalk.green.inverse('Note added successfully'));
  }
}

const removeNotes = (title) => {
  const notes = getNotes();
  const noteExist = notes.filter( note => {
    return note.title === title;
  })
  if(noteExist.length) {
    const filteredData = notes.filter(note => {
      return note.title !== title;
    })
    addNotesToDB(JSON.stringify(filteredData));
    console.log(chalk.green.inverse('Note removed succesfully'));
  } else {
    console.log(chalk.red.inverse('Note not found!'));
  }
}

const listNotes = () => {
  const notes = getNotes();
  console.table(notes);
}

const getNote = (title) => {
  const notes = getNotes();
  const noteExist = notes.filter(note => {
    return note.title === title;
  })

  if(noteExist.length) {
    console.table(noteExist);
  } else {
    console.log(chalk.red.inverse('Note not found'));
  }
}

const getNotes = () => {
  try {
    let dataBuffer = fs.readFileSync('db.json');
     dataBuffer = String(dataBuffer);
    const notes = JSON.parse(dataBuffer);
    return notes
  } catch(e) {
    return [];
  }
}


const addNotesToDB = (dbData) => {
  fs.writeFileSync('db.json', dbData);
}
module.exports = {
  addNotes,
  removeNotes,
  listNotes,
  getNote
}