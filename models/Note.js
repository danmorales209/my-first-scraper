const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    body: {
        type: String,
        required: true
    }

});

const Note = mongoose.model("Notes", NoteSchema);

module.exports = Note;