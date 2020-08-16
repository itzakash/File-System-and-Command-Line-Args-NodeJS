const fs = require('fs');
const chalk = require('chalk');
const { debug } = require('console');

/*
 ****************
 * Add new Note *
 ****************
 */
const addNote = (title, body) => {
  const notes = loadNotes();

  // const duplicateNote = notes.filter((note) => note.title === title);

  // return undefined or data
  const duplicate = notes.find((note) => note.title === title);

  debugger;
  // const duplicateNote = notes.filter((note) => {
  //   return note.title === title;
  // });

  if (!duplicate) {
    notes.push({
      title: title,
      body: body,
    });

    saveNotes(notes);
    return chalk.green('Note Addedd !');
  } else {
    return chalk.red('Note Already Taken !');
  }
};

/*
 ************************
 * Remove Specific Note *
 ***********************
 */
const removeNote = (title) => {
  const notes = loadNotes();
  const duplicateNote = notes.filter((note) => {
    return note.title === title;
  });

  if (duplicateNote.length == 0) {
    return chalk.red.inverse('Note not found ') + title;
  }

  const storeMatching = notes.filter((note) => {
    return note.title !== title;
  });

  saveNotes(storeMatching);

  return chalk.green(title) + chalk.red(' Note Deleted');
};

const listnotes = () => {
  const notes = loadNotes();
  return notes;
};

const getnote = (title) => {
  const notes = loadNotes();

  return notes.filter((note) => note.title === title);

  // return
};

/*
 **********************
 * Get All Added note *
 **********************
 */
const loadNotes = () => {
  try {
    const bufferData = fs.readFileSync('data.json');
    const dataJSON = bufferData.toString();

    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

/*
 *************
 * Save Note *
 *************
 */
const saveNotes = (notes) => {
  const data = JSON.stringify(notes);
  fs.writeFileSync('data.json', data);
};

module.exports = {
  addNote: addNote,
  listnotes: listnotes,
  removeNote: removeNote,
  getnote: getnote,
};
