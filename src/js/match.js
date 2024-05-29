import '../scss/match.scss';
import * as bootstrap from 'bootstrap'

import {callingMoviesByGenres} from "./api"
let contenedor = document.querySelector('#container-movies')
const generos = localStorage.getItem("genres")

callingMoviesByGenres(generos,contenedor,0)

localStorage.removeItem("movie")















