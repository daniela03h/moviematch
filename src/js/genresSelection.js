import '../scss/styles.scss';
import * as bootstrap from 'bootstrap'

apiKey =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNmEyYWVkZTI3NGVlNTNhODE4MWNiYTdjYWE2OGU1MiIsInN1YiI6IjY2MzhjOGZlY2MyNzdjMDEyNjI0MjA0YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iyeS7L10eNU8DHriuy3a8immj3diRspaHc6eMHRaW1o";
genresSection = document.getElementById("genres");
genresSelected = document.getElementById("selected-genres");
selectedGenre = {};

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
    console.log("Géneros de películas:");
    data.genres.forEach((genre) => {
      console.log(genre.name + ":", genre.id);

      //creación de cada boton
      genresSection.innerHTML += `
      <button type="button" class="genre-btn" onclick="genreSel('${genre.id}', '${genre.name}')">
      ${genre.name}
  </button>`;
    });
  })
  .catch((err) => console.error(err));

//seleccionador de generos

function genreSel(idGenreSelected, nameGenreSelected) {
  selectedGenre[idGenreSelected] = nameGenreSelected;
  showSelectedGenres();
}

//mostrar los generos seleccionados

function showSelectedGenres() {
  genresSelected.innerHTML = "";
  genresCounter = 0;
  for (const idGenreSelected of Object.keys(selectedGenre)) {
    if (genresCounter < 3) {
      genresSelected.innerHTML += `
        <button type="button" class="genre-btn ms-5" onclick="deleteGenre(${idGenreSelected})">
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
function searchMovie() {
  //array de generos
  const genres=Object.keys(selectedGenre)
  console.log("GENEROS SELECCIONADOS:",genres)

  //18?
  const checkboxInput = document.getElementById("flexSwitchCheckDefault");
  const estadoCheckbox = checkboxInput.checked;
  console.log("ESTADO DEL SWITCH (18?): ", estadoCheckbox);
}
