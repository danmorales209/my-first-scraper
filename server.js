const express = require('express');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

const app = express();

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));