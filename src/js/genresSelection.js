import "../scss/genresSelection.scss";
import * as bootstrap from "bootstrap";

const apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmEyYWVkZTI3NGVlNTNhODE4MWNiYTdjYWE2OGU1MiIsInN1YiI6IjY2MzhjOGZlY2MyNzdjMDEyNjI0MjA0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iyeS7L10eNU8DHriuy3a8immj3diRspaHc6eMHRaW1o";
let genresSection = document.getElementById("genres");
let genresSelected = document.getElementById("selected-genres");
let selectedGenre = {};
const botonSearch = document.getElementById("search");

//llamado de la api recomendado por TMDB (la api que se está utilizando)
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${apiKey}`,
  },
};

fetch("https://api.themoviedb.org/3/genre/movie/list?language=en", options) //llamado a la api (link que llama a los generos, constante que indica el metodo (en este cado, get). )
  .then((response) => response.json()) //promesa que recibe los datos que trae la api y les quita el formato JSON
  .then((data) => { //la respuesta de la promesa se introduce en la variable objeto "data", y se ejecuta la siguiente función
    // Imprimir los géneros en la consola
    data.genres.forEach((genre) => { //iterar el objeto "genres" del objeto "data" (esto ya que el array contiene dos elementos)
      console.log(genre.name + ":", genre.id); //prueba

      //creación de cada boton asignandoseles su id y su nombre
      genresSection.innerHTML += `
      <button type="button" class="genre-btn" id="${genre.id}" name="${genre.name}">
      ${genre.name}
  </button>`;
    });
  })
  .catch((err) => console.error(err)); //en caso de que fetch no pueda recibir los datos de la api, se devuelve un mensaje "error" a la consola


//evento de creacion de generos seleccionados
genresSection.addEventListener("click", (event) => {
  let id = event.target.getAttribute("id");
  let name = event.target.getAttribute("name");
  genreSel(id, name); //añadir genero al array "selectedGenre"
  showSelectedGenres(id, name); //mostrar los generos de este array en su contenedor
});

//evento de eliminacion de generos seleccionados
genresSelected.addEventListener("click", (event) => {
  let id = event.target.getAttribute("id");
  deleteGenre(id);
});

//añadidor de generos al array
function genreSel(idGenreSelected, nameGenreSelected) {
  selectedGenre[idGenreSelected] = nameGenreSelected;
  console.log(selectedGenre); //prueba 
}

//mostrar los generos seleccionados
function showSelectedGenres() {
  genresSelected.innerHTML = ""; //limpiar contenedor de lo generos seleccionados
  let genresCounter = 0; //contador de los generos que han sido seleccionados
  for (const idGenreSelected of Object.keys(selectedGenre)) { //iteracion del objeto "selectedGenre" que imprime en el contenedor "genresSelected" cada genero seleccionado
    if (genresCounter < 3) { //cantidad maxima de generos admitible
      genresSelected.innerHTML += ` 
      <button type="button" class="genre-btn" id="${idGenreSelected}" name="${selectedGenre[idGenreSelected]}">${selectedGenre[idGenreSelected]}</button>`; //creación de botones con cada genero seleccionado
      genresCounter++;
    } else {
      alert("el maximo de generos agregable es 3"); //alerta en caso de que se supere la capacidad maxima
      delete selectedGenre[idGenreSelected]; //eliminar genero sobrante del objeto "selectedGenre"
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
  //array de generos seleccionados
  const genres = Object.keys(selectedGenre); //creacion del array "genres"
  console.log("GENEROS SELECCIONADOS:", genres); //prueba 

  //input check-switch para indicar si una pelicula es para adultos? (eliminar si no va a usarse)
  // const checkboxInput = document.getElementById("flexSwitchCheckDefault");
  // const estadoCheckbox = checkboxInput.checked;
  // console.log("ESTADO DEL SWITCH (18?): ", estadoCheckbox); //prueba
});
