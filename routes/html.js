const cheerio = require('cheerio');
const db = require('../models');
const mongoose = require('mongoose');

module.exports = function (app) {
  app.get("/", function (req, res) {

    db.Article.find({}).then(function (results) {
      res.render('home', {
        article: results
      });
    }).catch(function (err) {
      res.send("An error occurred").render('home');
    });

  });

  app.get("/article/:ID", function (req, res) {

    db.Article.findOne({
      _id: req.params.ID
    }).populate("notes").then(function (data) {

      let noteArray = data.note.map(e => mongoose.Types.ObjectId(e));

      db.Note.find({
        _id: {
          $in: noteArray
        }
      }, function (err, docs) {

        if(err) {
          return res.status(500).send("An error occurred").end();
        }
      
        let renderData = {
          _id: data._id,
          title: data.title,
          author: data.author,
          note: docs
        };

        res.render('article', renderData);

      });

    }).catch(function (error) {
      console.error(error);
      res.end("an error occurred");
    })
  });
}