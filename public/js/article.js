$("#return").on("click", function (event) {
    event.preventDefault();

    location.replace("/");
});

$("#add-note").on("click", function (event) {
    event.preventDefault();
    let newNote = {
        title: $("#note-title").val().trim(),
        body: $("#note-body").val().trim(),
        articleID: $(this).data("id")
    }
    console.log(newNote);

    $.post("/api/add-note", newNote).then(function (response) {
        alert(response);
    }).then(() => window.location.reload());

});

$(".btn-danger").on("click", function (e) {
    e.preventDefault();

    $.ajax({
            url: `/api/delete/${$(this).data("id")}`,
            method: "DELETE",
        })
        .then(function (response) {
            console.log(response);
        })
        .then(function () {
            window.location.reload();

        });
});