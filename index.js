import {createCustomObj, renderSearchResult} from 'utils.js'

$(document).ready(function () {
  let movieToWatchListHtml = [];
  let moviesTitle = [];
  
  //Fire search btn click event
  $("#search-btn").click((event) => {
    event.preventDefault();
    let searchInputText = $("#search-input").val();

    // will search when only user put a valid input text
    if(searchInputText){
    //fetch API with the keyword user put
    fetch(
      `http://www.omdbapi.com/?apikey=2cc10b4e&t=${searchInputText}&plot=full`)
      .then((res) => (res.json()))
      .then((data) => {
        
        //if there is no result, this paragraph will appear 
        if(data.Response ==='False'){
          console.log('no result found')
          $("#result-wrapper").html(`<p class="no-result"> Unable to find what you're looking for. <br>Please try another search.</p>`)
        } else{
        // filter only needed data
        let userSearchResultObj = createCustomObj(data);

        // print out the object that contains only needed key and value
        // save movie' title's array to use in other html page
        moviesTitle.push(userSearchResultObj.Title);
        renderSearchResult(userSearchResultObj);
        $("#search-input").click((event)=>{
          event.target.value = ''
        })

        //when user clicks read more btn, more contents will be shown
        $(".readMore").click((event) => {
          event.target.style.display = "none";
          event.target.style.visibility = "collapse";
          $(".hidden-plot").css("visibility", "visible");
          $(".hidden-plot").css("display", "inline");
          $(".readLess").css("visibility", "visible");
          $(".readLess").css("display", "block");
        });

        // when user clicks read less btn, the contents will be collapsed
        $(".readLess").click((event) => {
          event.target.style.display = "none";
          event.target.style.visibility = "collapse";
          $(".hidden-plot").css("visibility", "hidden");
          $(".hidden-plot").css("display", "none");
          $(".readMore").css("visibility", "visible");
          $(".readMore").css("display", "block");
        });

        //when user clicks watchlist btn, set the local storage and save the movie 
        $("#watchList-btn").click((event) => {
          localStorage.setItem("movies", JSON.stringify(moviesTitle));
          console.log(localStorage.getItem("movies"));
          //to copy html value for the movie to send data to watchlist.html
          movieToWatchListHtml = $("#result-wrapper").get(0).innerHTML
          $( "#result-wrapper" ).data( "test", movieToWatchListHtml);
        });
        }
      });
    }
    //catch when user input is less than 3 character
    else{
      alert('please enter 2 or more characters')
    }
 });
});