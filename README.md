# Web Scraper - [Live Link](https://mighty-thicket-97023.herokuapp.com)
This is a small web app that scrapes [this page](https://kotaku.com/tag/zelda) for stories, and allows the user to add notes to each story.

The application is built using Node / Express for the backend, and serves HTML via [express-handlebars](https://www.npmjs.com/package/express-handlebars).

Data from the website is accessed from Node using [Axios](https://www.npmjs.com/package/axios) to perform AJAX requests and [Cheerio](https://www.npmjs.com/package/cheerio) to interact with the data using jQuery.

Data is stored in collections via [Mongoose](https://www.npmjs.com/package/mongoose) MongoDB ORM. 

The front end is built using HTML5, CSS, and Bootstrap 4. The front-end logic ustilizes jQuery.

The Applcation is hosted on Heroku,

---
## Using the Web Scraper
Selecte the "Scrape something bruh" button to scrape the target website. Once the server has completed the scrape and updated the MongoDB collection, the page is reloaded to display the stories.

The user may click the "Add Note" button to view all notes for a particulate story, and add their own notes. All notes can be deleted by pressing the "Delete" button.

---
