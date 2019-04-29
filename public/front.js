$("#scrape-button").on("click", function (event) {
    event.preventDefault();

    console.log($(".card").length)

    if ($(".card").length <= 0) {
        console.log("Starting the Scrape");

        $.get("/api/scrape").then(function (resp) {
            console.log(resp);

        }).then(() => window.location.reload());

    }


});

$("#clear-button").on("click", function (event) {

    event.preventDefault();

    $.ajax({
        method: "DELETE",
        url: "/api/delete"
    }).then(function (response) {
        console.log(response);
        window.location.reload();
    })



})