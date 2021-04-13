// use file system, chalk
const chalk = require("chalk");
const fs = require("fs");
const getNotes = () => {
  return "Your notes...";
};
// add note function.  Takes a title, and a body
const addNote = (title, body) => {
  const notes = loadNotes(); // load existing notes
  // if a duplicate title is found, added to array of duplicates
  const duplicateNotes = notes.filter((note) => note.title == title);

  // if the array of duplicates has no length, there are no duplicates
  if (duplicateNotes.length == 0) {
      // push note to array
    notes.push({
        title: title,
        body: body
    })
    // save note
    saveNotes(notes)
    console.log(chalk.inverse.green("New note added!"));
  }
  // duplicate found.  Do not save note
  else{
      console.log(chalk.inverse.red("Note is a duplicate!"));
  }

};

// To save, take an array of notes
// turn the JSON data into string
// write the stringifyed data back to JSON file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json',dataJSON);
    }

    // to load notes, try to read notes.json
    // and convert data to string
    // return the JSON parsed data

    // if cannot load notes throw error
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
      return [];
  }
};

// remove note function
// call to load notes
// Keep the notes in the array if the title entered does not match 
// title of the note (thereby popping the note off the array)
const removeNote = (title) => {
    const notes = loadNotes();
    const filteredNotes = notes.filter((note) => {
        return note.title != title
    })
    // if the length of the array didn't change, nothing was removed
    if (notes.length == filteredNotes.length)
    {
        console.log(chalk.red.inverse("No note to remove with that title!"));
    } else{
        // else, re-save the array
        saveNotes(filteredNotes);
        console.log(chalk.green.inverse("Note removed!"));
    }
}

// load the notes into buffer
// foreach note title, print to console
const listNotes = () =>{
    notes = loadNotes();
    console.log(chalk.blue.inverse("YOUR NOTES"));
    notes.forEach(note => console.log(note.title));
}
// export functions
module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
};
