export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzkwY2I4YWZlNDVmYzE5OWJkNDBlZDA0OGU2MzBiYSIsInN1YiI6IjY2NGJmYTVjNzNjZGI0NGJiZjMwMTAzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fx4EKy7hXNKnVjw6QAIuHSiQ7k-w0YRO9jt4cx3QVJI'
  }
};

// calling genres of the api url and transform it to js object
export async function callingGenres(site) {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options);
    const data = await response.json();
    data.genres.forEach((genre) => { //iterar el objeto "genres" del objeto "data" (esto ya que el array contiene dos elementos)

      //creación de cada boton asignandoseles su id y su nombre
      site.innerHTML += `
      <button type="button" class="genre-btn" id="${genre.id}" name="${genre.name}">
      ${genre.name}
      </button>`;
    });

  } 
  


// ######################################################################################################################################



export  async function callingMoviesByGenres(genres,sitio,movieMatched) {
  let url = "https://image.tmdb.org/t/p/w500/"
  let movies = [];
  let page = 1;
  let ids = []
  const maxPage = 8; // MAX PAGES TO GET MOVIES(20 MOVIES PER PAGE)
  while (page <= maxPage) {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genres}&page=${page}`, options);
    const data = await response.json();
      const filteredMovies = data.results.filter(movie => movie.original_language=="en"&&movie.backdrop_path !== null);
      movies = movies.concat(filteredMovies);
      page++;
    }
    localStorage.setItem("movies",  JSON.stringify(movies));
    const movie = movies[movieMatched]
    localStorage.setItem("movies",(movie.title,url+movie.backdrop_path,movie.overview,movie.id,url+movie.poster_path));
    ids = ids.concat(movie.id);
    localStorage.setItem("ids",ids)
    sitio.innerHTML = `
    <div class="col-md-3 col-sm-6 col-12">
    <div class="card">
      <img src="${url+movie.backdrop_path}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">${movie.overview}</p>
        <p class="card-text">${movie.overview}</p>
        <p class="card-text">${movie.overview}</p>
      </div>
      <div class="card-footer">
        <small class="text-muted">ID: ${movie.id}</small>
      </div>
    </div>
    </div>
    `; 
  }



// #######################################################################################################################################

//TREND LIST

// async function trendList (){
//   let trendMovies = []
//   const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options)
//   const data = await response.json();
//   const filteredMovies = data.results.filter(movie => movie.original_language=="en")
//       trendMovies = trendMovies.concat(filteredMovies);
//   // console.log(trendMovies);  //array with trend list of movies
  
// }

// trendList()


//MOVIE PROVIDERS IMAGE

 export async function getProviders(id) {
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?watch_region=CO`, options)
  const data = await response.json();
  // console.log(data.results.CO.rent);
  let url = "https://image.tmdb.org/t/p/w500/"
  let providers = await data.results.CO?.rent 
  await providers?.forEach(plataform => {
    if(providers !== null){
      console.log(id, ":",url+plataform.logo_path)
    }else{
      console.log(id,"no hayy");
    }
    //RETURN URL IMAGE TO PROVIDERS
  });
}

// getProviders(823464)

//MATCH MOVIE //ASIGN SELECTED MOVIE INTO USER WITH KEY SELECTEDMOVIE

// async function selectedMovie (){
//    function registerUser (user,lastName,email,password) {
    
//     const  newUser = {
//          username: user.value.toLowerCase(),
//          lastName: lastName.value.toLowerCase(),
//          email: email.value,
//          password:  password.value
//      }
 
//      await fetch (`http://localhost:3000/users`,{
//      method: 'POST',
//      headers: {
//          'Content-Type': 'application/json'
//      },
//      body: JSON.stringify(newUser)    //EN BODY COLOCAMOS EL JSON QUE VAMOS A GUARDAR EN LA DB (TAMBIEN LO CONVERTIMOS A JSON)
//  })
 
//  }
// }