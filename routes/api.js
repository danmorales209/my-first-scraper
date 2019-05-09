const cheerio = require('cheerio');
const db = require("../models");
const mongoose = require('mongoose');
const axios = require('axios');

module.exports = function (app) {

    app.get("/api/scrape", function (req, res) {
        console.log("Scraping...");

        axios.get('https://kotaku.com/tag/zelda').then(function (response) {
            const $ = cheerio.load(response.data);


            let titles = $(".iKyVcF").toArray().map(element => $(element).text());
            let links = $(".sqekv3-4").toArray().map(element => $(element).children("a").attr("href"));
            let author = $(".dfSdTn").toArray().map(element => $(element).children("a").text());

            let articleObjects = [];

            // Build out the array of objects
            for (let i = 0; i < links.length; i++) {
                articleObjects.push({
                    title: titles[i] || "No Title Given",
                    url: links[i] || "No URL given",
                    author: author[i] || "No Author Given"
                })
            }

            db.Article.create(articleObjects)
                .then(function (results) {
                    res.send("Scrape Complete").end();
                }).catch(function (error) {
                    res.status(500).send("An error occurred").end();
                    console.error(error);
                });

        }).catch(function (err) {
            console.error(err);
            res.status(500).send("Internal Error occurred").end();
        });

    });

    app.delete("/api/delete", function (req, res) {

        db.Article.deleteMany({}).then(function (results) {
            res.status(200).send(results).end();
        }).catch(function (error) {
            res.status(500).end();
            console.error(error);
        })

    });

    app.post("/api/add-note", function (req, res) {

        let newNote = {
            title: req.body.title,
            body: req.body.body
        };

        console.log(newNote);

        db.Note.create(newNote).then(function (results) {
            console.log("Created " + results._id);

            db.Article.updateOne({
                _id: req.body.articleID
            }, {
                $push: {
                    note: results._id
                }
            }).then(function (upResults) {
                res.status(200).send("Note created " + upResults).end();

            }).catch((upError) => {
                console.error(upError);
                res.status(500).send("An error occurred").end();

            });

        }).catch(function (createErr) {
            console.error(createErr);
            res.status(500).send("An internal error occurred").end();
        });
    });

    app.delete("/api/delete/:id", function (req, res) {

        console.log(req.params.id);

        db.Note.deleteOne({_id:req.params.id}, function (err, data) {
            if (err) {
                return console.error(err);
            }
            console.log(data)
            res.status(200).send("Delete succesful").end();
        });

    });
};