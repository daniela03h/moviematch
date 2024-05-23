const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzkwY2I4YWZlNDVmYzE5OWJkNDBlZDA0OGU2MzBiYSIsInN1YiI6IjY2NGJmYTVjNzNjZGI0NGJiZjMwMTAzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fx4EKy7hXNKnVjw6QAIuHSiQ7k-w0YRO9jt4cx3QVJI'
  }
};
// calling genres of the api url and transform it to js object
async function callingGenres() {
    let genres = []
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    const data = await response.json();
    genres.push(data.resultsf)
    console.log(genres);
  } 
  
callingGenres();

// ######################################################################################################################################


async function callingMoviesByGenres(genres) {
  let movies = [];
  let page = 1;
  const maxPage = 5; // Define el número máximo de páginas que deseas obtener
  const genresString = genres.join(',');

  while (page <= maxPage) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genresString}&page=${page}`, options);
    const data = await response.json();
      const filteredMovies = data.results.filter(movie => movie.original_language=="en");
      movies = movies.concat(filteredMovies);
      page++;
    }
    console.log(movies);
  }

let genres = ['28', '12', '16']; // IDs de géneros

callingMoviesByGenres(genres);


// #######################################################################################################################################

//TREND LIST

async function trendList (){
  trendMovies = []
  const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
  const data = await response.json();
  const filteredMovies = data.results.filter(movie => movie.original_language=="en")
      trendMovies = trendMovies.concat(filteredMovies);
  console.log(trendMovies);  //array with trend list of movies
}

trendList()