import { updateFavMovies } from "./api";
import { updateNotFavMovies } from "./api";
import { getMovieImageById } from "./api";
import Swal from "sweetalert2";

export async function startCounter(movie) {

//variables para contador
  const actualTime = Date.now(); // Obtener la hora actual en milisegundos
  const savedTime = localStorage.getItem("startCounter"); // Leer la hora guardada en localStorage
  let timer = 7000; //tiempo que tardarà la alerta en salir (una hora equivale a 3600000)

    //variables para favoritos
  let awaitLink = await getMovieImageById(movie); //funcion asincrona para obtener imagen
  let userIdWithQuotes = localStorage.getItem("userID"); //obtener ID de localStorage
  let userId = userIdWithQuotes.replace(/^"(.*)"$/, "$1"); //quitarle comillas al user
  // Función que se ejecutará después de 24 horas
  function favQuestion() {
    // Muestra el cuadro de confirmación de favorito
    const respuesta = Swal.fire({
      imageUrl: awaitLink,
      imageWidth: 400,
      imageHeight: 200,
      imageAlt: "Imagen de pelicula",
      title: `did you liked the movie?`,
      showCancelButton: true,
      confirmButtonText: "Yes!",
      cancelButtonText: "No!",
    });

    respuesta.then((result) => {
      // despues de elegir "yes" o "no"
      if (result.isConfirmed) {
        Swal.fire("We are glad you liked it!! :D");
        updateFavMovies(userId, movie); //se agrega la pelicula a favoritos
        localStorage.removeItem("movie");
        
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("We are sorry that it was not to your liking. :(");
        updateNotFavMovies(userId, movie); //se agrega a no favoritos
        localStorage.removeItem("movie");
      }
    });

    localStorage.removeItem("startCounter"); // Resetea el temporizador
  }

  if (savedTime) {
    // Si ya hay una hora guardada
    const passedTime = actualTime - savedTime; // Calcular el tiempo transcurrido

    if (passedTime >= timer) {
      // Si ha pasado el tiempo predispuesto en la variable "timer"
      favQuestion(); // Ejecutar el evento inmediatamente
    } else {
      setTimeout(favQuestion, timer - passedTime); // Ajustar el temporizador para el tiempo restante
    }
  } else {
    localStorage.setItem("startCounter", actualTime); // Guardar la hora actual en localStorage (savedTime)
    setTimeout(favQuestion, timer); // Configurar el temporizador 
  }
}


