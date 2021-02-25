import RegisterFormController from './controllers/RegisterFormController.js'
import ErrorController from './controllers/ErrorController.js'

window.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.user-form')
    new RegisterFormController(registerForm)

    const error = document.querySelector('.message');
    new ErrorController(error)
})