const mongoose = require("mongoose");

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    url: {
        type: String,
        required: true
    },

    author : {
        type: String,
        required: true
    },

    note: {
        type: [Schema.Types.ObjectId],
        ref: "Note"
    }
});

// Create the model
const Article = mongoose.model("Articles", ArticleSchema);
// Export the model
module.exports = Article;