const cheerio = require('cheerio');
const db = require("../models");
const mongoose = require('mongoose');
const axios = require('axios');

module.exports = function (app) {
    app.get("/api/articles", function (req, res) {

        db.Article.find({}, function (err, results) {
            if (err) {
                return res.status(500).send("A sever error occurred").end();
            }

            console.log(results);

            res.json(results);

        })
    }),

        app.get("/api/scrape", function (req, res) {
            console.log("Scraping...");

            axios.get('https://kotaku.com/tag/zelda').then(function (response) {
                const $ = cheerio.load(response.data);

                let titles = $(".entry-title").toArray().map(element => $(element).children(".js_link").children("div").text());
                let links = $(".main-media").toArray().map(element => $(element).children("div").children("a").attr("href"));

                let articleObjects = [];

                // Build out the array of objects
                for (let i = 0; i < links.length; i++) {
                    articleObjects.push(
                        {
                            title: titles[i] || "No Title Given",
                            url: links[i] || "No URL given"
                        }
                    )
                }

                db.Article.create(articleObjects)
                    .then(function (results) {
                        console.log(results);
                        res.send("Scrape Complete").end();
                    }).catch(function (error) {
                        res.status(500).send("An error occurred").end();
                        console.error(error);
                    });

            });

        });

        app.delete("/api/delete", function (req, res) {

            db.Article.deleteMany({}).then(function(results) {
                res.status(200).send(results).end();
            }).catch(function (error) {
                res.status(500).end();
                console.error(error);
            })

        })
}