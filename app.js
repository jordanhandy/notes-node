const yargs = require("yargs");
const { readNote } = require("./notes");
const notes = require('./notes');

// customize yargs version
yargs.version('1.1.0');
// create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        // define options
        title: {
            describe: 'Note title',
            // a value for this option is required
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }

    },
    // pass the argument vector into the function
    handler(argv){
        // log the output to console
        notes.addNote(argv.title, argv.body);
    }
})

//
// Challenge: Add an option to yargs
//
// 1. Setup a body option for the add command
// 2. Configure a description, make it required, and for it to be a string
// 3. Log the body value in the handler function
// 4. Test your work

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note!',
    builder:{
        title:{
            describe: "Note title",
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title);
    }
})


// List command
yargs.command({
    command: 'list',
    describe: 'List your current notes',
    handler (){
        notes.listNotes();
    }
})

// read individual note
yargs.command({
    command: 'read',
    describe: 'read your notes..',
    builder: {
        title:{
            describe: 'note title',
            demandOption: true,
            type: 'string'
    }
},
    handler(argv){
        readNote(argv.title);
    }
})

yargs.parse();
//console.log(yargs.argv);