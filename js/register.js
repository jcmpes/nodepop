import RegisterFormController from './controllers/RegisterFormController.js'
import ErrorController from './controllers/ErrorController.js'
import LoaderController from './controllers/LoaderController.js'
import HeroController from './controllers/HeroController.js'

window.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.lds-ring')
    new LoaderController(loader)

    const hero = document.querySelector('.hero')
    new HeroController(hero, "Register New User")

    const registerForm = document.querySelector('.user-form')
    new RegisterFormController(registerForm)

    const error = document.querySelector('.message');
    new ErrorController(error)
})