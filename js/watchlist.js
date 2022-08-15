import { createCustomObj, isPlotLongOrShort } from './utils.js';
$(document).ready(() => {
  let savedMovies = JSON.parse(localStorage.getItem("movies"));

  for(let i=0; i<savedMovies.length; i++){

    fetch(`http://www.omdbapi.com/?apikey=2cc10b4e&t=${savedMovies[i]}&plot=full`)
      .then((res) => res.json())
      .then((data) => {
        let newData = createCustomObj(data);
        let html = createHtmlCollection(newData)
        $( "#result-wrapper" ).append( html );
        $(".stars-inner").css("width", newData.Rating + "%");
      })
  }

  $("#result-wrapper").on("click", ".readMore", function() {
    $(this).css({"display":"none", "visibility":"collapse"});
    $(".hidden-plot").css({"visibility":"visible", "display":"inline"});
    $(".readLess").css({"visibility":"visible", "display":"block"});
  });

  $("#result-wrapper").on("click", ".readLess", function() {
    $(this).css({"display":"none", "visibility":"collapse"});
    $(".hidden-plot").css({"visibility":"hidden", "display":"none"});
    $(".readMore").css({"visibility":"visible", "display":"block"});
  });

function createHtmlCollection(obj){

    return `<div class="movie-result">
    <div class="movie-poster-sec">
            <img src="${obj.Poster}" alt="" class="movie-poster-img"/>
        </div>
  
        <div class="movie-info-sec">
            <div class="movie-info-header">
                <div class="movie-title-and-rating">
                    <h3 class='movie-title'>${obj.Title}</h3>
                    <div class="stars-outer">
                        <div class="stars-inner"></div>
                    </div>
                </div>
                <div class="movie-genre-and-runtime">
                    <h4 class='movie-genre'>${obj.Genre}</h4>
                    <h4 class='movie-runtime'>${obj.Runtime}</h4>
                </div>
            </div>
            <div class="movie-info-plot">
                <p class='movie-plot-p'>${isPlotLongOrShort(obj.Plot)}</p>
            </div>
        </div>`
}
});
