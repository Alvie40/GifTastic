$(document).ready(function () {
    //TODO$(document).click("??", "??",function() {})
    //?get some attr
    //ajax
    console.log ("pass test 1");
    $("#add-rapper").click(function (e) { 
        e.preventDefault();
        console.log ("pass test 2");
        var name = $("#rapper-name").val().trim();
        console.log(name);
        if (name !==""){
            $("#buttons").append(`<button class ="rapper-btn">${name}</button>`);
            $("#rapper-name").val("");
        }
    });
})