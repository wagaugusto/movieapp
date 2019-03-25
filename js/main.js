$(document).ready(() => {
  $("#searchForm").on('submit', (e) => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    getMovies(searchText);
  });
});

if(performance.navigation.type == 2)
{
    getMovies(localStorage.getItem("myCookie"));
}

function getMovies(searchText){      
    localStorage.setItem("myCookie", searchText);
    console.log(localStorage.getItem("myCookie"));
  axios.get("https://api.themoviedb.org/3/search/movie?api_key=5c85ee18cf91cdab9e87149bbf39d4f4&language=pt-BR&query=" + searchText)
    .then(function (response) {
      let movies = response.data.results;
      let output = '';
      $.each(movies, (index, movie) => {
        output+=`
          <div class="col-md-3">
            <div class="well text-center">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}">
              <h5>${movie.title}</h5>
              <a onclick="movieSelected('${movie.id}')" class="btn btn-primary" href="#">Saiba mais</a>
            </div>
          </div>
        `;
      });
      $('#movies').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get("https://api.themoviedb.org/3/movie/" + movieId + "?api_key=5c85ee18cf91cdab9e87149bbf39d4f4&language=pt-BR")
    .then(function (response) {
    let movie = response.data;
    let output = `
        <div class="row">
          <div class="col-md-4">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Gênero:</strong> ${movie.genres[0].name}, ${movie.genres[1].name}</li>
              <li class="list-group-item"><strong>Data de lançamento:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Nota:</strong> ${movie.vote_average}</li>
              <li class="list-group-item"><strong>Duração:</strong> ${movie.runtime} min.</li>
              <li class="list-group-item"><strong>Produção:</strong> ${movie.production_companies[0].name}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Sinopse</h3>
            ${movie.overview}
            <hr>
            <a href="http://imdb.com./title/${movie.imdb_id}" target="_blank" class="btn btn-primary">Veja no IMDB</a>
            <a href="#" onclick=window.history.back() class="btn btn-default">Voltar</a>
          </div>
        </div>
    `;
    $('#movie').html(output);
    })
    .catch(function (error) {
      console.log(error);
    });
}
