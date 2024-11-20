import '../scss/singin.scss';
import * as bootstrap from 'bootstrap'
import Swal from "sweetalert2";
//Llamar inputs de formato
const form = document.querySelector('form')
const email = document.querySelector('#email')
const password = document.querySelector('#password')


form.addEventListener('submit', async(event) => { //CUANDO LE DE CLICK AL BOTON VA A VALIDAR TODO
    event.preventDefault()
    const user = await validateEmail(email)
    if (user === false){ //SI EL CORREO DA FALSE ES PORQUE NO EXISTE
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "It is not registered",
          });
    }else{
        if (user.password == password.value){ //VERIFICA CONTRASEÑA

            localStorage.setItem("userOnline", JSON.stringify(user))  //GUARDAMOS LA SESION DEL USUARIO EN EL LOCAL STORAGE
            localStorage.setItem("userID", JSON.stringify(user.id)) //GUARDAMOS EL ID DEL USUARIO TAMBIEN

            window.location.href = "http://localhost:5173" //MOVEMOS AL USUARIO A LA PAGINA PRINCIPAL
        }else{
            Swal.fire({
                icon: "error",
                title: "Wrong password",
                text: "Password wrong!",
               
              });
        }
    }
})

//VALIDA SI EL CORREO EXISTE DEVOLVIENDO UN TRUE O FALSE
async function validateEmail(email) {
    const response = await fetch(`http://localhost:3000/users?email=${email.value}`) // añadimos ?email=${email} PARA PASARLE PARAMETROS A LA URL
    const data = await response.json()
 
    if (data.length>0) {
         return data[0]          //TRAEMOS EL OBJETO QUE NOS VA A TRAER DATA (que por logica solo va a existir 1, asi que pedimos posicion 0)  //VALIDAMOS SI EXISTE UN USUARIO CON EL EMAIL O NO 
    }else{
         return false
    }
 }
 