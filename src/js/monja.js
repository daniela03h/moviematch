import {callingMoviesByGenres} from "./api"
import {options} from "./api"
// import { callingMoviesByGenres } from "./api"
import { getProviders } from "./api"
let contenedor = document.querySelector('#contenedor')
const generos = localStorage.getItem("genres")
let movies = JSON.parse(localStorage.getItem("movies"))
let btnRematch = document.querySelector(".btn-rematch")
console.log(movies);
let movieMatched = 0 




callingMoviesByGenres(generos,contenedor,movieMatched)
btnRematch.addEventListener("click", ()=>{
    movieMatched+=1
    callingMoviesByGenres(generos,contenedor,movieMatched)
})


movies?.forEach(movie => {
    getProviders(JSON.stringify(movie.id))
    // console.log("IDDD",movie.id);
});

localStorage.removeItem("movies")
