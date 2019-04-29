const cheerio = require('cheerio');
const db = require('../models');

module.exports = function (app) {
  app.get("/", function (req, res) {

    db.Article.find({}).then(function (results) {
      console.log(results);
      res.render('home', { article: results });
    }).catch(function (err) {
      res.send("An error occurred").render('home');
    });

  });
}