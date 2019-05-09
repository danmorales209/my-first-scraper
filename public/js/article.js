$("#return").on("click", function (event) {
    event.preventDefault();

    location.replace("/");
});

$("#add-note").on("click", function (event) {
    event.preventDefault();

    let newTitle = $("#note-title").val().trim();
    let newBody = $("#note-body").val().trim();

    if ((newTitle !== "") && newBody !== "") {
        let newNote = {
            title: newTitle,
            body: newBody,
            articleID: $(this).data("id")
        }

        $.post("/api/add-note", newNote).then(function (response) {
            console.log(response);
            $("#note-title").text('');
            $("#note-body").text('');
        }).then(() => window.location.reload());
    }
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