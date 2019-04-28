$(document).ready(function () {
    var topics = ["US", "Brazil", "Japan", "Argentina"];

    function createButtons() {
        $("#buttons").empty();

        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");

            gifButton.attr("ID", "gifArrayButtons");
            gifButton.attr("class", "btn btn-primary btn-space")
            gifButton.attr("data-button", topics[i]);
            gifButton.text(topics[i]);

            $("#buttons").append(gifButton);
        }
    }
    createButtons();
    $("#add-button").click(function () {
        var keywordPush = $("#keyword").val();
        topics.push(keywordPush);
        createButtons();
        $("#keyword-term").val("");
    })

    $(document).on("click", "#gifArrayButtons", function () {
        var searchQuery = $(this).attr("data-button");
        var apiKEY = "api_key=zwomJLMgHi62SL1YoAzGYC7xuTFzvZqD";
        var queryURL = "https://api.giphy.com/v1/gifs/search?" + apiKEY + "&q=" + searchQuery + "&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            var gifOfArray = response.data;

            for (var i = 0; i < gifOfArray.length; i++) {
                var gifDiv = $("<div>");
                gifDiv.addClass("card btn-space mx-auto")
                gifDiv.attr("style", "width: 20em")
                var gifDivBody = $("<div>")
                gifDivBody.addClass("card-body")

                var gifRating = gifOfArray[i].rating;
                var gifTitle = gifOfArray[i].title;
                var gifTitleShort = gifTitle.slice(0, 15);

                var title = $("<strong>").text(gifTitleShort.toUpperCase() + "...");
                title.attr("class", "card-title")
                var rating = $("<p>").text("Rating: " + gifRating.toUpperCase());
                rating.attr("class", "card-body")

                var gifAnimate = gifOfArray[i].images.fixed_height.url
                var gifStill = gifOfArray[i].images.fixed_height_still.url
                var gifImage = $("<img>");
                gifImage.attr("src", gifStill);
                gifImage.attr("data-still", gifStill)
                gifImage.attr("data-animate", gifAnimate)
                gifImage.attr("data-state", "still")
                gifImage.addClass("card-img-top gif")

                gifDiv.append(gifImage);
                gifDiv.append(gifDivBody);
                gifDivBody.append(title);
                gifDivBody.append(rating);

                $("#gif-body").prepend(gifDiv);

            }
        });
    })


    $(document).on("click", "img.gif", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still")
        }
    })


});