const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNTA4OGJlMTNjMDU5MDY2MjZhZTg5YmI1NTM2MDM2NSIsInN1YiI6IjY2NGIzN2JjMzhkN2FhZDhjOTc5ODY0ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.I527myp9u6D9tJxiCc1H2dGn_hlqeUMpdBhbYd50Rho'
  }
};
// calling genres of the api url and transform it to js object
async function callingGenres() {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    const data = await response.json();
    console.log(data);
  } 
  
callingGenres();

// ######################################################################################################################################

//find a movie using 3 genres with the id and filter using the age(+18/-18)
async function callingMoviesByGenres(genres,age){
  let movies = []
  let page = 1
  let maxPage = 2
  const genresString = genres.join(',')

  while (page<=maxPage) {  //we use page becouse the api returns 1 page witch 20 movies, so we need use more than a page 
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genresString}`, options);
    const data = await response.json();
    movies = movies.concat(data.results) //the data is concat because movies is an array, and result is only 1 page in each iteration
    page++
  }
  console.log(movies)
}

let genres = ['28', '12', '16'] //genres ids
let age = false //if age == false the movies are family friendly, else are +18

callingMoviesByGenres(genres,age)

// #######################################################################################################################################

//TREND LIST

async function trendList (){
  const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
  const data = await response.json();
  console.log(data.results);  //array with trend list of movies
}

trendList()