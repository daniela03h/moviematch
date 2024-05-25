import "../scss/genresSelection.scss";
import * as bootstrap from "bootstrap";

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmEyYWVkZTI3NGVlNTNhODE4MWNiYTdjYWE2OGU1MiIsInN1YiI6IjY2MzhjOGZlY2MyNzdjMDEyNjI0MjA0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iyeS7L10eNU8DHriuy3a8immj3diRspaHc6eMHRaW1o";
let genresSection = document.getElementById("genres");
let genresSelected = document.getElementById("selected-genres");
let selectedGenre = {};
const botonSearch = document.getElementById("search");
let genresCounter = 0;

//llamado de la api
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options)
  .then((response) => response.json())
  .then((data) => {
    // Imprimir los géneros en la consola
    data.genres.forEach((genre) => {
      console.log(genre.name + ":", genre.id);

      //creación de cada boton
      genresSection.innerHTML += `
      <button type="button" class="genre-btn" id="${genre.id}" name="${genre.name}">
      ${genre.name}
  </button>`;
    });
  })
  .catch((err) => console.error(err));

//seleccionador de generos

genresSection.addEventListener("click", (event) => {
  let id = event.target.getAttribute("id");
  let name = event.target.getAttribute("name");
  console.log(id, name);
  genreSel(id, name);
});

genresSelected.addEventListener("click", (event) => {
  let id = event.target.getAttribute("id");
  let name = event.target.getAttribute("name");
  console.log(id, name);
  genreSel(id, name);
});

//seleccionador de generos

function genreSel(idGenreSelected, nameGenreSelected) {
  selectedGenre[idGenreSelected] = nameGenreSelected;
  console.log(selectedGenre);
  showSelectedGenres();
}

//mostrar los generos seleccionados

function showSelectedGenres() {
  genresSelected.innerHTML = "";
  
  for (const idGenreSelected of Object.keys(selectedGenre)) {
    if (genresCounter < 3) {
      genresSelected.innerHTML += `
        <button type="button" class="genre-btn ms-5" id="${genre.id}" name="${genre.name}")">
          ${selectedGenre[idGenreSelected]}
        </button>`;
      genresCounter++;
    } else {
      alert("el maximo de generos agregable es 3");
      delete selectedGenre[idGenreSelected];
    }
  }
}
//eliminar los generos seleccionados

function deleteGenre(idGenreSelected) {
  delete selectedGenre[idGenreSelected];
  showSelectedGenres();
}

//mandar el id de los generos al array "genres"
botonSearch.addEventListener("click", function searchMovie() {
  //array de generos
  const genres = Object.keys(selectedGenre);
  console.log("GENEROS SELECCIONADOS:", genres);

  //18?
  const checkboxInput = document.getElementById("flexSwitchCheckDefault");
  const estadoCheckbox = checkboxInput.checked;
  console.log("ESTADO DEL SWITCH (18?): ", estadoCheckbox);
});