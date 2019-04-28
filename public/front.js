$("#scrape-button").on("click", function (event) {
    event.preventDefault();

    console.log("Starting the Scrape");

    $.get("/api/articles").then(function(resp){
        console.log(resp);
    });


});