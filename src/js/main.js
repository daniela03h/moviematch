import '../scss/styles.scss';
import * as bootstrap from 'bootstrap'

console.log('Module loaded')

document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('nav')
    window.addEventListener('scroll', function() {
        if(window.scrollY > 10) {
            navbar.classList.add("nav-scrolled-background")
        } else {
            navbar.classList.remove("nav-scrolled-background")
        }
    })
})