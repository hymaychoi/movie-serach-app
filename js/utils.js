export function parseToRatingStars(objRating) {
  let starRatingValue = 0;
  //parse obj Rating value
  starRatingValue = parseFloat(objRating) * 10;
  return starRatingValue;
}

export function createCustomObj(obj) {
  //find if there is rating records of the movie
  let objRatingValue = "";
  if (!obj.imdbRating) {
    objRatingValue = "no ratings";
  } else {
    //if the movie has ratings we will parse the rating percentage
    //to the 5 stars ratings
    objRatingValue = parseToRatingStars(obj.imdbRating);
  }

  let newObj = {
    Title: obj.Title,
    Runtime: obj.Runtime,
    Genre: obj.Genre,
    Plot: obj.Plot,
    Rating: objRatingValue,
    Poster: obj.Poster,
  };
  return newObj;
}

//https://www.youtube.com/watch?v=QEZVTvtvDt4&ab_channel=CodingArtist
export function renderSearchResult(obj) {
  $("#result-wrapper").html(getSearchResultHtml(obj));
  $(".stars-inner").css("width", obj.Rating + "%");
}

export function getSearchResultHtml(obj){
  return `
  <div class="movie-result">
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
                  <button id='watchList-btn'> + Watchlist</button>
              </div>
          </div>
          <div class="movie-info-plot">
              <p class='movie-plot-p'>${isPlotLongOrShort(obj.Plot)}</p>
          </div>
      </div>`
}

export function isPlotLongOrShort(moviePlot) {
  let plotLengthLimit = 270;
  if (moviePlot.length > plotLengthLimit) {
    let firstSet = moviePlot.substring(0, plotLengthLimit);
    let secHalf = moviePlot.substring(plotLengthLimit, moviePlot.length);
    let readMoreHtml = `<a class='readMore' href='javascript:void(0)'>Read more..</a><span class='hidden-plot'>`;
    let readLessHtml = `<a class='readLess' href='javascript:void(0)'>Read less..</a></span>`;
    let moreContentPlot = `${firstSet}${readMoreHtml}${secHalf}${readLessHtml}`;

    return moreContentPlot;
  } else {
    return moviePlot;
  }
}