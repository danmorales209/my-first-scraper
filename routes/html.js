const cheerio = require('cheerio');
const db = require('../models');

module.exports = function (app) {
  app.get("/", function (req, res) {

    db.Article.find({}).then(function (results) {
      res.render('home', { article: results });
    }).catch(function (err) {
      res.send("An error occurred").render('home');
    });

  });

  app.get("/article/:ID", function (req, res) {

    console.log(req.params.ID);

    db.Article.findOne({_id:req.params.ID}, function (err, data) {

      if (err) {
        throw err;
      }
      res.render('article', {data})
    })
  });
}