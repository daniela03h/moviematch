import { updateFavMovies } from "./api";
import { updateNotFavMovies } from "./api";
import { getMovieImageById } from "./api";
import Swal from "sweetalert2";

export async function startCounter(movie) {
  let espera = await getMovieImageById(movie);
  const actualTime = Date.now(); // Obtener la hora actual en milisegundos
  const savedTime = localStorage.getItem("startCounter"); // Leer la hora guardada en localStorage
  let userIdWithQuotes = localStorage.getItem("userID");
  let userId = userIdWithQuotes.replace(/^"(.*)"$/, "$1");
  // Función que se ejecutará después de 24 horas
  function favQuestion() {
    // Muestra el cuadro de confirmación
    const respuesta = Swal.fire({
      imageUrl: espera,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Imagen de pelicula",
      title: `Disfrutaste de esta pelicula?`,
      showCancelButton: true,
      confirmButtonText: "Si!",
      cancelButtonText: "No!",
    });

    respuesta.then((result) => {
      // Aquí puedes ejecutar código después de que el usuario haya interactuado con la alerta
      if (result.isConfirmed) {
        alert("¡Nos alegra saber que te gustó!");
        updateFavMovies(userId, movie);
        localStorage.removeItem("movie");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        alert("Lamentamos que no haya sido de tu agrado.");
        updateNotFavMovies(userId, movie);
        localStorage.removeItem("movie");
      }
    });

    localStorage.removeItem("startCounter"); // Resetea el temporizador
  }

  if (savedTime) {
    // Si ya hay una hora guardada
    const passedTime = actualTime - savedTime; // Calcular el tiempo transcurrido

    if (passedTime >= 5000) {
      // Si han pasado 24 horas o más
      favQuestion(); // Ejecutar el evento inmediatamente
    } else {
      setTimeout(favQuestion, 5000 - passedTime); // Ajustar el temporizador para el tiempo restante
    }
  } else {
    localStorage.setItem("startCounter", actualTime); // Guardar la hora actual en localStorage
    setTimeout(favQuestion, 5000); // Configurar el temporizador para 24 horas
  }
}
