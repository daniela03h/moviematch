import '../scss/match.scss';
import * as bootstrap from 'bootstrap'
import { getProviders } from './api';
import {callingMoviesByGenres} from "./api"
let contenedor = document.querySelector('#container-movies')
const generos = localStorage.getItem("genres")
let movies = JSON.parse((localStorage.getItem("movies")))
let movieId = localStorage.getItem("ids")

callingMoviesByGenres(generos,contenedor,0)
console.log(movies);



localStorage.removeItem("movies")















