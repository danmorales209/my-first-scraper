const express = require('express');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 3000;

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

require("./routes/api.js")(app);