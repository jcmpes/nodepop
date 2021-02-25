import RegisterFormController from './controllers/RegisterFormController.js'


window.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('#register-form')
    new RegisterFormController(registerForm)
})