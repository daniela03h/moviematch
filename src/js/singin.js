import '../scss/singin.scss';
import * as bootstrap from 'bootstrap'

//call form and inputs 

const form = document.querySelector('form')

const email = document.querySelector('#email')

const password = document.querySelector('#password')


form.addEventListener('submit', async(event) => {
    event.preventDefault()
    const user = await validateEmail(email)
    if (user === false){
        alert("No esta regitrado")
    }else{
        if (user.password == password.value){

            localStorage.setItem("userOnline", JSON.stringify(user))  //GUARDAMOS LA SESION DEL USUARIO EN EL LOCAL STORAGE

            window.location.href = "http://localhost:5173/src/pages/genreSelector.html"
        }else{
            alert("Contraseña Incorrecta")
        }
    }
})


async function validateEmail(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`) // añadimos ?email=${email} PARA PASARLE PARAMETROS A LA URL
    const data = await response.json()
 
    if (data.length>0) {
         return data[0]          //TRAEMOS EL OBJETO QUE NOS VA A TRAER DATA (que por logica solo va a existir 1, asi que pedimos posicion 0)  //VALIDAMOS SI EXISTE UN USUARIO CON EL EMAIL O NO 
    }else{
         return false
    }
 }
 