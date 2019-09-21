const yargs = require('yargs');

const service = require('./service');

yargs.version('1.1.1');

yargs.command({
  command: 'add',
  description: 'command to add note',
  builder: {
    'title': {
      description: 'title of the note',
      type: 'string',
      demandOption: true
    },
    'body': {
      description: 'body of the note',
      type: 'string',
      demandOption: true
    }
  },
  handler: function(argv) {
    service.addNotes(argv.title, argv.body);
  }
});

yargs.command({
  command: 'remove',
  description: 'remove the note',
  builder: {
    title: {
      description: 'title of the note',
      type: 'string',
      demandOption: true
    }
  },
  handler: (argv) => {
    service.removeNotes(argv.title);
  }
});


yargs.command({
  command: 'list',
  description: 'lists all the notes',
  handler: () => {
    service.listNotes();
  }
});

yargs.command({
  command: 'get',
  description: 'List a perticular note',
  builder: {
    title: {
      description: 'Title of a note',
      demandOption: true,
      type: 'string'
    }
  },
  handler: (argv) => {
    service.getNote(argv.title);
  }
})

yargs.parse();