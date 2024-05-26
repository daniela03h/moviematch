
import "../scss/genreSelector.scss";
import * as bootstrap from "bootstrap";
import {options} from "./api"
import{callingGenres} from "./api"
import { callingMoviesByGenres } from "./api";

let genresSection = document.getElementById("genres");
let genresSelected = document.getElementById("selected-genres");
let moviesec = document.getElementById("pedrojuan");
let selectedGenre = {};
let genres=[];

const botonSearch = document.getElementById("search");

console.log(moviesec);

window.addEventListener("load", () => {
    localStorage.clear()
})

// Llamado a la API recomendado por TMDB (la API que se está utilizando)

callingGenres(genresSection)


// Evento de creación de géneros seleccionados
genresSection.addEventListener("click", (event) => {
  let id = event.target.getAttribute("id");
  let name = event.target.getAttribute("name");
  genreSel(id, name); // Añadir género al array "selectedGenre"
  showSelectedGenres(id, name); // Mostrar los géneros de este array en su contenedor
});

// Evento de eliminación de géneros seleccionados
genresSelected.addEventListener("click", (event) => {
  let id = event.target.getAttribute("id");
  deleteGenre(id);
});

// Añadidor de géneros al array
function genreSel(idGenreSelected, nameGenreSelected) {
  selectedGenre[idGenreSelected] = nameGenreSelected;
  console.log(selectedGenre); // Prueba 
}

// Mostrar los géneros seleccionados
function showSelectedGenres() {
  genresSelected.innerHTML = ""; // Limpiar contenedor de los géneros seleccionados
  let genresCounter = 0; // Contador de los géneros que han sido seleccionados
  for (const idGenreSelected of Object.keys(selectedGenre)) { // Iteración del objeto "selectedGenre" que imprime en el contenedor "genresSelected" cada género seleccionado
    if (genresCounter < 3) { // Cantidad máxima de géneros admitible
      genresSelected.innerHTML += ` 
      <button type="button" class="genre-btn" id="${idGenreSelected}" name="${selectedGenre[idGenreSelected]}">${selectedGenre[idGenreSelected]}</button>`; // Creación de botones con cada género seleccionado
      genresCounter++;
    } else {
      alert("el máximo de géneros agregable es 3"); // Alerta en caso de que se supere la capacidad máxima
      delete selectedGenre[idGenreSelected]; // Eliminar género sobrante del objeto "selectedGenre"
    }
  }
}

// Eliminar los géneros seleccionados
function deleteGenre(idGenreSelected) {
  delete selectedGenre[idGenreSelected];
  showSelectedGenres();
}

// Mandar el id de los géneros al array "genres"
botonSearch.addEventListener("click", function() {
  // Array de géneros seleccionados
  let genresA = Object.keys(selectedGenre); // Creación del array "genres"
  console.log("GÉNEROS SELECCIONADOS:", genresA); 
  genres.push(...genresA)
  const genresString = genres.join(',')
    console.log(genres);
    window.location.href = "http://localhost:5173/src/pages/match.html"
//   callingMoviesByGenres(genresString);
  localStorage.setItem("genres", genresString)

});


