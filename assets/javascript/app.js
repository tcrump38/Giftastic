$(document).ready(function() {

    var topics = ["Michael Scott", "Dwight Schrute", "Pam Beasley", "Kevin Malone", "Angela Martin", "Toby Flenderson", "Stanley Hudson", "Phyllis Vance"]
    var results;


    
        
    
        // Pull from array to show characters.
    
        function renderButtons() {
    
            $("#office-buttons").empty();
    
            for (i = 0; i < topics.length; i++) {
                
                var b = $("<button>");
    
                b.addClass("results-button");
                b.attr("data-name", topics[i]);
                b.text(topics[i]);
    
                $("#office-buttons").append(b);
            };
        };
    
        $("#submit-button").on("click", function(event) {
    
            event.preventDefault();
    
            var button = $("#office-input").val().trim();
    
            topics.push(button);
            
            renderButtons();
        });
        renderButtons();
    
        
        
        // Gif grab from database.
    
          function grabGiphy() {
    
             var searchId = $(this).attr("data-name");
             var searchStr = searchId.split(" ").join("+");
             var giphyURL = "https://api.giphy.com/v1/gifs/search?q=" + searchStr + "&api_key=GNUIDUTGzLfuydreVegbVBDLqU4Etqed&limit=10";
    
             $.ajax({
                url: giphyURL,
                method: "GET"
          }).done(function(response) {
            
            results = response.data;
    
            $("#character-pop").empty();
            for (var i = 0; i < results.length; i++) {
                
                var gifDiv = $("<div>");
                var h2 = $("<h2 class='rating'>").text("Rating: " + results[i].rating);
                var stillImage = $("<img>");
    
                h2.addClass("rating-text")
                
                stillImage.addClass("image-gifs")
                stillImage.attr("src", results[i].images.fixed_height_still.url);
                stillImage.attr("data-state", "still");
                stillImage.attr("data-position", i);
    
                gifDiv.append(h2);
                gifDiv.append(stillImage);
                gifDiv.addClass("individual-gifs")
    
              $("#character-pop").prepend(gifDiv);
            };
          }); 
        };
    
            // Populate new gifs that were entered.
    
        $(document).on("click", ".results-button", grabGiphy);
    
        // Function to animate.
    
        function animateGiphy() {
          var state = $(this).attr("data-state");
          var position = $(this).attr("data-position"); 
          position = parseInt(position);
    
          if (state === "still") {
            $(this).attr("src", results[position].images.fixed_height.url);
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", results[position].images.fixed_height_still.url);
            $(this).attr("data-state", "still");
          }
        };
    
      $(document).on("click", ".image-gifs", animateGiphy);
    
    });
    
    
    
    