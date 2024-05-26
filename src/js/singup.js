import "../scss/singup.scss";
import * as bootstrap from "bootstrap";

//CALL INPUTS AND FORM

const form = document.querySelector("form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const password = document.querySelector("#password");
const passwordConfirm = document.querySelector("#confirm");
const icon = document.querySelector("#icon");
let selectedIcon;
form.addEventListener("submit", async (event) => {
  event.preventDefault(); //AL MOMENTO DEL EVENTO QUE LA PAGINA NO SE ACTUALICE
  const checkPassword = validatePassword(password, passwordConfirm); //LLAMAMOS LA FUNCION DE LAS CONTRASEÑAS Y LE DAMOS LOS PARAMETROS QUE LLAMAMOS ANTERIORMENTE DESDE HTML
  const checkEmail = await validateEmail(email); //LLAMAMOS LA FUNCION DE LOS EMAIL Y LE DAMOS LOS PARAMETROS QUE LLAMAMOS ANTERIORMENTE DESDE HTML
  const sIcon = selectedIcon; //LAMAMOS LA URL DE LOS ICONOS
  if (checkPassword && checkEmail) {
    await registerUser(username, email, password, sIcon);
    window.location.href = "/"; //ESTO SIRVE PARA MOVERNOS DESDE EL JAVASCRIPT A OTRAS VENTANAS
  } else {
    alert("Las contraseñas no coinciden");
  }
});

//revisar que las contraseñas de confirmar sean iguales

function limpiar() {
  const images = document.querySelectorAll("#icon img");
  for (const image of images) {
    image.classList.remove("icons");
  }
}

//OBTENER EL ICONO
icon.addEventListener("click", (event) => {
  limpiar();
  selectedIcon = event.target.getAttribute("src");
  event.target.classList.add("icons");
  console.log(selectedIcon);
  return selectedIcon;
});

function validatePassword(password, passwordConfirm) {
  if (password.value === passwordConfirm.value) {
    return true;
  } else {
    return false;
  }
}

//VERIFICAR QUE EL CORREO NO ESXISTA EN EL JSON SERVER

async function validateEmail(email) {
  const response = await fetch(
    `http://localhost:3000/users?email=${email.value}`
  ); // añadimos ?email=${email} PARA PASARLE PARAMETROS A LA URL
  const data = await response.json();

  if (data.length === 0) {
    return true; //VALIDAMOS SI EXISTE UN USUARIO CON EL EMAIL O NO
  } else {
    return false;
  }
}

async function registerUser(user, email, password, urlIcon) {
  const newUser = {
    username: user.value,
    email: email.value,
    password: password.value,
    icon: urlIcon,
    favMovies: [],
    notFavMovies: [],
  };

  await fetch(`http://localhost:3000/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser), //EN BODY COLOCAMOS EL JSON QUE VAMOS A GUARDAR EN LA DB (TAMBIEN LO CONVERTIMOS A JSON)
  });
}
