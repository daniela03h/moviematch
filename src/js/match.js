import '../scss/match.scss';
import * as bootstrap from 'bootstrap'

import {callingMoviesByGenres} from "./api"
//import {options} from "./api"
// import { callingMoviesByGenres } from "./api"
//import { getProviders } from "./api"
let contenedor = document.querySelector('#container-movies')
const generos = localStorage.getItem("genres")


callingMoviesByGenres(generos,contenedor,0)


// movies.forEach(movie => {
//     getProviders(JSON.stringify(movie.id))
//     console.log("IDDD",movie.id);
// });

localStorage.removeItem("movie")














