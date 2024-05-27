import '../scss/match.scss';
import * as bootstrap from 'bootstrap'

import {callingMoviesByGenres} from "./api"
import {options} from "./api"
// import { callingMoviesByGenres } from "./api"
import { getProviders } from "./api"
let contenedor = document.querySelector('#container-movies')
const generos = localStorage.getItem("genres")
let movies = JSON.parse((localStorage.getItem("movies")))

callingMoviesByGenres(generos,contenedor,0)
console.log(movies);

// movies.forEach(movie => {
//     getProviders(JSON.stringify(movie.id))
//     console.log("IDDD",movie.id);
// });

localStorage.removeItem("movies")















