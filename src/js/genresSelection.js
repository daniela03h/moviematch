import "../scss/genresSelection.scss";
import * as bootstrap from "bootstrap";

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmEyYWVkZTI3NGVlNTNhODE4MWNiYTdjYWE2OGU1MiIsInN1YiI6IjY2MzhjOGZlY2MyNzdjMDEyNjI0MjA0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iyeS7L10eNU8DHriuy3a8immj3diRspaHc6eMHRaW1o";
let genresSection = document.getElementById("genres");
let genresSelected = document.getElementById("selected-genres");
let selectedGenre = {};
let genres=[];
let genreString;
const botonSearch = document.getElementById("search");
const botonSearch2 = document.getElementById("search2");


// Llamado a la API recomendado por TMDB (la API que se está utilizando)
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options) // Llamado a la API (link que llama a los géneros, constante que indica el método (en este caso, GET).)
  .then((response) => response.json()) // Promesa que recibe los datos que trae la API y les quita el formato JSON
  .then((data) => { // La respuesta de la promesa se introduce en la variable objeto "data", y se ejecuta la siguiente función
    // Imprimir los géneros en la consola
    data.genres.forEach((genre) => { // Iterar el objeto "genres" del objeto "data" (esto ya que el array contiene dos elementos)
      console.log(genre.name + ":", genre.id); // Prueba

      // Creación de cada botón asignándoles su id y su nombre
      genresSection.innerHTML += `
      <button type="button" class="genre-btn" id="${genre.id}" name="${genre.name}">
      ${genre.name}
  </button>`;
    });
  })
  .catch((err) => console.error(err)); // En caso de que fetch no pueda recibir los datos de la API, se devuelve un mensaje "error" a la consola

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
  genres.push(...genresA) //añadir al array "genres" los elementos del array "genresA" de esta función
  genreString = genres.join(",")
});

botonSearch2.addEventListener("click", function () {
  console.log("PRUEBA QUE EL ARRAY SALIÓ DEL EVENTO: ",genreString)
})
