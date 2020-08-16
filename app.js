const yargs = require('yargs');
const chalk = require('chalk');
const validator = require('validator');
const notes = require('./notes');
const { argv } = require('yargs');

// const add = addNotes();
const log = console.log;

yargs.command({
  command: 'add',
  describe: 'Adding a note',
  builder: {
    title: {
      describe: 'Note title',
      type: 'string',
      demandOption: true,
    },
    body: {
      describe: 'Note Body',
      type: 'string',
      demandOption: true,
    },
  },
  handler: (argv) => {
    log(notes.addNote(argv.title, argv.body));
  },
});

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note Title',
      type: 'string',
      demandOption: true,
    },
  },
  handler: (argv) => {
    log(notes.removeNote(argv.title));
  },
});

yargs.command({
  command: 'listnotes',
  describe: 'Get All Notes',
  handler: (argv) => {
    console.log(chalk.green.inverse('Your Notes'));
    const data = notes.listnotes();
    console.table(data);
  },
});

yargs.command({
  command: 'getnote',
  describe: 'Get the note by title',
  builder: {
    title: {
      describe: 'Note Title',
      type: 'string',
    },
  },
  handler: (argv) => {
    console.log(notes.getnote(argv.title));
  },
});

yargs.parse();
// log(yargs.argv);
