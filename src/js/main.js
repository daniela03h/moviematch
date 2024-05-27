import '../scss/styles.scss';
import * as bootstrap from 'bootstrap'
const sectionUser = document.querySelector("#pedro")
console.log(sectionUser);
//se realiza un evento para cuando se haga scroll
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('nav')
    window.addEventListener('scroll', function () {
        if (window.scrollY > 10) {
            navbar.classList.add("nav-scrolled-background")
        } else {
            navbar.classList.remove("nav-scrolled-background")
        }
    })
})
window.addEventListener("load", () => {
    // Recuperamos el item del localStorage
    const userOnline = localStorage.getItem("userOnline");
    console.log(userOnline); // Verificar en la consola si existe y es el esperado
  
    if (userOnline === null) {
      // Si no hay usuario en línea, mostramos opciones de Sing In y Sing Up
      sectionUser.innerHTML = `
        <a class="navbar-brand" href="">
        <img class="logo" src="./public/img/logo-white-MovieMatch.png" alt="">
        </a>
    <div class="d-flex flex-row gap-3 container-sing">
        <div class="d-flex align-items-center gap-1 "> <a class="nav-link active title-header"
                aria-current="page" href="./src/pages/singin.html">SIGN IN </a> <img class="icon-sing" src="./public/img/sing.png"
                alt="">
        </div>
        <div class="d-flex align-items-center gap-1 "> <a class="nav-link active title-header"
                aria-current="page" href="./src/pages/singup.html">SIGN UP </a> <img class="icon-sing" src="./public/img/sing.png"
                alt="">
        
        </div>
    </div>

    <button class="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-lg-center  " id="navbarNavAltMarkup">
        <div class="navbar-nav gap-lg-5 ">
            <a class="nav-link active title-header" aria-current="page" href="#home">HOME</a>
            <a class="nav-link active title-header" aria-current="page" href="#info">INFO</a>
            <a class="nav-link active title-header" aria-current="page" href="#trends">TRENDS</a>
        </div>
    </div>`;
    } else {
      // Si hay un usuario en línea, mostramos su información
      const user = JSON.parse(userOnline);
      sectionUser.innerHTML = `
      <a class="navbar-brand" href="">
      <img class="logo" src="./public/img/logo-white-MovieMatch.png" alt="">
  </a>
  <div class="d-flex flex-row gap-3 container-sing">
        <div class="d-flex align-items-center gap-1">
          <p class="username" aria-current="page">${user.username}</p> 
          <img class="icon-user" src="${user.icon}" alt="">
        </div>
        <div class="d-flex align-items-center gap-1">
        <button id="logout" type="button" class="btn">Logout</button>
  </div>
  </div>
  <button class="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse"
      data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse justify-content-lg-center  " id="navbarNavAltMarkup">
      <div class="navbar-nav gap-lg-5 ">
          <a class="nav-link active title-header" aria-current="page" href="#home">HOME</a>
          <a class="nav-link active title-header" aria-current="page" href="/src/pages/genreSelector.html">DO A MATCH!</a>
          <a class="nav-link active title-header" aria-current="page" href="#info">INFO</a>
          <a class="nav-link active title-header" aria-current="page" href="#trends">TRENDS</a>

      </div>
  </div>`;;
      let logout = document.querySelector("#logout")
      logout.addEventListener("click", () => {
        localStorage.removeItem("userOnline");
        location.reload();
      });
    }
  });

// traer elementos del HTML
const sliderContainer = document.getElementById("movie-trends");
const sliderContainer2 = document.getElementById("movie-trends2");
const sliderContainer3 = document.getElementById("movie-trends3");
const sliderContainer4 = document.getElementById("movie-trends4");
const sliderContainerMobile = document.querySelector(".mobile-carousel");

// llamar a la api con el metodo GET
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmEyYWVkZTI3NGVlNTNhODE4MWNiYTdjYWE2OGU1MiIsInN1YiI6IjY2MzhjOGZlY2MyNzdjMDEyNjI0MjA0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iyeS7L10eNU8DHriuy3a8immj3diRspaHc6eMHRaW1o",
    },
};

//funcion que llama los elementos de cada pelicula y los inserta en el HTML
async function trendList() {
    const response = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
        options
    );
    const data = await response.json();
    const filteredMovies = data.results

    // divisor de las peliculas
    let movieScreen = 0;
    filteredMovies.forEach((trendMovie, index) => {
        if (movieScreen < 4) {
            movieScreen++;
            sliderContainer.innerHTML += renderMovieCard(trendMovie);
        } else if (movieScreen < 8) {
            movieScreen++;
            sliderContainer2.innerHTML += renderMovieCard(trendMovie);
        } else if (movieScreen < 12) {
            movieScreen++;
            sliderContainer3.innerHTML += renderMovieCard(trendMovie);
        } else if (movieScreen < 16) {
            movieScreen++;
            sliderContainer4.innerHTML += renderMovieCard(trendMovie);
        }
        sliderContainerMobile.innerHTML += renderMovierCardMobile(trendMovie, index)
    });
}

function renderMovieCard(trendMovie) {
    return `
    <div class="flip-card mt-5 mb-5">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src="https://image.tmdb.org/t/p/w500${trendMovie.poster_path}" alt="Avatar">
        </div>
        <div class="container p-5 flip-card-back">
          <h3>${trendMovie.original_title}</h3>
          <p>${trendMovie.overview}</p>
        </div>
      </div>
    </div>`;
}

trendList();




function renderMovierCardMobile(trendMovie, index) {
    return `
    <div class="carousel-item ${index === 0 ? 'active': ''}">
    <div class="flip-card mt-5 mb-5">
      <div class="flip-card-inner">
        <div class="flip-card-front">
        <img src="https://image.tmdb.org/t/p/w500${trendMovie.poster_path}" class="d-block w-100">
        </div>
        <div class="container p-5 flip-card-back">
          <h3>${trendMovie.original_title}</h3>
          <p>${trendMovie.overview}</p>
        </div>
      </div>
    </div>

</div>
    `
}

