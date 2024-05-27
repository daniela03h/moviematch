//CREAMOS LAS OPCIONES CON LAS QUE VAMOS A CONSUMIR LA API Y LAS EXPORTAMOS
export const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNzkwY2I4YWZlNDVmYzE5OWJkNDBlZDA0OGU2MzBiYSIsInN1YiI6IjY2NGJmYTVjNzNjZGI0NGJiZjMwMTAzNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Fx4EKy7hXNKnVjw6QAIuHSiQ7k-w0YRO9jt4cx3QVJI'
  }
};

// ESTA FUNCION RECIBE EL ATRIBUTO DE DONDE SE VA A HACER EL INNER, EL CUAL SE LO DA EL ARCHIVO GENRESELECTOR.JS
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

////CREAMOS UNA FUNCION QUE BUSCA LAS PELICULAS POR GENEROS, RECIBE LOS GENEROS Y EL LUGAR DONDE SE VAN A INSERTAR, ADEMAS LLEVA UN CONTADOR DE CADA VEZ QUE SE HACE REMATCH
let localMovieMatched = 0 //CREAMOS UNA VARIABLE GLOBAL QUE VA A TOMAR LOS VALORES DE EL CONTADOR QUE ESTA DENTRO DE LA FUNCION
export  async function callingMoviesByGenres(genres,sitio,movieMatched=0) {
  localMovieMatched =movieMatched
  let url = "https://image.tmdb.org/t/p/w500/" //ESTA VARIABLE SE PONE AL INICIO DE CADA RUTA DE IMAGEN PARA QUE PUEDA MOSTRARSE DESDE LA RED
  let movies = [];
  let page = 1; //CONTADOR DE LAS PAGINAS
  let ids = []
  const maxPage = 8; // LA API TRAE 20PELICULAS POR PAGINA, POR LO QUE VAMOS A TRAER 8 PAGINAS
  while (page <= maxPage) { //RECORRE LAS PELICULAS Y VA AUMENTANDO LA PAGINA
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?with_genres=${genres}&page=${page}`, options); //LLAMA LAS PELICULASPOR GENEROS Y POR PAGINAS
    const data = await response.json(); 
      const filteredMovies = data.results.filter(movie => movie.original_language=="en"&&movie.backdrop_path !== null); //FILTRA LAS PELICULAS PARA QUE LAS QUE QUEDEN SEAN EN INGLES Y CONTENGA IMAGEN
      movies = movies.concat(filteredMovies); //AÑADE ESTAS PELICULAS A FILTEREDMOVIES
      page++;
    }
    // localStorage.setItem("movies",  JSON.stringify(movies));
    const movie = movies[localMovieMatched] //MOSTRAMOS LA PELICULA EN LA POSICION 0, QUE ES A LO QUE EQUIVALE LA VARIABLE
    // ids = ids.concat(movie.id);
    // localStorage.setItem("ids",ids)
    //INSERTAMOS EN EL HTML EN EL LUGAR QUE SE INGRESO CADA ITERACION DE LA PELICULA
    sitio.innerHTML = `
    <main id="container-movies">
    <section class="movie d-flex">
        <img class="background-movie" src="${url+movie.backdrop_path}" alt="">
        <article class="container-one d-flex justify-content-center align-items-end ps-5">
            <!-- <div class="container-info d-flex "> -->
            <div class="container-info d-flex flex-column flex-md-row">
                <h1 class="title-movie fw-bold mb-3 mb-md-0">${movie.title}</h1>
                <div class="d-flex align-items-center gap-3">
                    <i class="bi bi-star-fill star"></i>
                    <p class="rating-movie mb-0">${movie.vote_average}</p>
                </div>
            </div>

            <!-- <div class="d-flex flex-column">
                    <h1 class="title-movie fw-bold ">${movie.title}</h1>     ORIGINAL
                    <div class="d-flex gap-3 justify-content-center">
                        <i class="bi bi-star-fill"></i>
                        <p class="rating-movie">5.0</p>
                    </div>
                </div> -->

            <div class="container-buttons"> <!--margin-right: 100px;-->
                <button class="btn-rematch btn" type="button">Re Match</button>
                <a href="./accepted.html"><button class="btn" type="submit">Match</button></a>
            </div>
            </div>
        </article>

        <article class="container-two d-flex flex-column">
            <div class="container-image-small d-flex justify-content-center">
                <img class="movie-small" src="${url+movie.backdrop_path}" alt=""> <!--imagen pequeña -->
            </div>

            <div class="container-description text-center p-5">
                <p>
                ${movie.overview}
                </p>
            </div>
            <div class="avaliable d-flex gap-5 justify-content-center mb-4 ">
                <h2 class="avaliabletext">Avaliable in:</h2>
                <div>
                    <a href=""><img src="../../public/img/disney.png" alt="" class="img-avaliable imgmovie"></a>
                    <a href=""><img src="../../public/img/amazon.png" alt="" class="img-avaliable imgmovie"></a>
                    <a href=""><img src="../../public/img/netflix.png" alt="" class="img-avaliable imgmovie"></a>
                </div>
            </div>

            <div class="d-flex flex-column  gap-4 justify-content-center align-items-center ">
                <h2 class="contract">Contract with us 50% off</h2>
                <a class="whatsapp" href="https://web.whatsapp.com/" target="_blank">CLICK HERE <i
                        class="bi bi-whatsapp whatsapp"></i>
            </div>
        </article>
    </section>
    `; 

    // #####################BOTON REMATCH #########################
    let btnRematch = document.querySelector(".btn-rematch") //EN ESTE EVENTO VAMOS A AÑADIRLE 1 AL CONTADOR CREADO Y VOLVEMOS A LLAMAR LA FUNCION PARA QUE MUETSRE LA SIGUIENTE PELICULA
    btnRematch.addEventListener("click", ()=>{
      let contenedor = document.querySelector('#container-movies')
      const generos = localStorage.getItem("genres")
      localMovieMatched+=1
      callingMoviesByGenres(generos,contenedor,localMovieMatched)
  })
  }

  

// #######################################################################################################################################


// #################################################FUNCION PARA OBTENER PROOVEDORES#####################################################################################

export async function getProviders(id) { //AÑADIMOS EL ID DE LA PELICULA A BUSCAR 
  const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/watch/providers?watch_region=CO`, options)
  const data = await response.json();
  // console.log(data.results.CO.rent);
  let url = "https://image.tmdb.org/t/p/w500/" //URL PARA QUE MUESTRTE LAS IMAGENES
  let providers = await data.results.CO?.rent  //FILTRAMOS EL ARRAY PARA QUE ME DE LOS PROOVEDORES
  await providers?.forEach(plataform => {       //RECORREMOS LOS PROOVEDORES PARA MOSTRAR TODAS LAS IMAGENES
    if(providers !== null){                     
      console.log(id, ":",url+plataform.logo_path)
    }else{
      console.log(id,"no hayy");
    }
    //RETURN URL IMAGE TO PROVIDERS
  });
}
