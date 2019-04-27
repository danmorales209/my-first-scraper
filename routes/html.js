const cheerio = require('cheerio');

module.exports = function (app) {
    app.get("/", function (req, res) {

        let article = [
            {
                title: "A",
                link: "https://google.com",
                _id: "1"
            },
            {
                title: "B",
                link: "https://google.com",
                _id: "2"
            },
            {
                title: "C",
                link: "https://google.com",
                _id: "3"
            }
        ];

        res.render('home', { article });
    });
}