import '../scss/match.scss';
import * as bootstrap from 'bootstrap'


// Funcion para actualizar imagen cuando el usuario escoja una pelicula diferente

// Obtenemos todas las imágenes de películas
const movieImages = document.querySelectorAll('.imgSmall');
// Obtenemos la imagen grande
const bigImage = document.querySelector('.fund');

// Añadimos un evento de clic a cada imagen de película
movieImages.forEach(image => {
    image.addEventListener('click', () => {
        // Actualizamos la imagen grande con la imagen de la película clicada
        bigImage.src = image.src;
    });
});















