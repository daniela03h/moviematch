import '../scss/accepted.scss';
import * as bootstrap from 'bootstrap'

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
