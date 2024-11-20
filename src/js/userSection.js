import "../scss/userSection.scss";
import * as bootstrap from "bootstrap";
import { getMovieById } from "./api";

const header = document.querySelector("#head");
let userOnline = JSON.parse(localStorage.getItem("userOnline"));
const favoritesCont = document.querySelector(".favorites");
const notFavoritesCont = document.querySelector(".not-favorites");

//SE INSERTA EN EL HEADER LAS CREDENCIALES DEL USUARIO QUE ESTA REGISTRADO
header.innerHTML = `<article class="home">
<a href="../../index.html">HOME</a>
</article>
<article class="user">
<h1>Hi, ${userOnline.username}</h1>
<img src="${userOnline.icon}" alt="">
</article>`

async function getFavorites () { //FUNCION QUE ENTRA AL JSON SERVER Y EXTRAE UN ARRAY DE PELICULAS FAVORITAS Y UNO DE NO FAVORITAS
    // Obtener los datos actuales del usuario del servidor
    const response = await fetch(`http://localhost:3000/users/${userOnline.id}`);
    const userData = await response.json();
    let favorites = userData.favMovies //CREACION DE ARRAY FAVORITOS
    let notFavorites = userData.notFavMovies //NO FAVORITOS

    favorites.forEach(id => {  //RECORREMOS LOS IDS DE FAVORITOS Y LOS INSERTAMOS A LA FUNCION CREADA EN API UNO POR UNO POR MEDIO DEL FOREACH, TAMBIEN INTRODUCIMOS EL LUGAR DEL INNER
        getMovieById(id,favoritesCont)
        
        })

    notFavorites.forEach(movie => { //RECORREMOS LOS IDS DE NO FAVORITOS Y LOS INSERTAMOS A LA FUNCION CREADA EN API UNO POR UNO POR MEDIO DEL FOREACH, TAMBIEN INTRODUCIMOS EL LUGAR DEL INNER
        getMovieById(movie,notFavoritesCont)
        })
    

}  

getFavorites()  //LLAMAMOS LA FUNCION PARA QUE SE EJECUTE


