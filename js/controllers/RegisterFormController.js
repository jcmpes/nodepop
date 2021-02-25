import dataService from '../../services/DataService.js'
import { registerView } from '../views/registerView.js'
import { loginView } from '../views/loginView.js'

export default class RegisterFormController {

    constructor(element) {
        this.element = element
        this.renderRegisterForm();
        this.actionsEventListener();
    };

    actionsEventListener() {
        // Submit registration 
        this.element.addEventListener('submit', async (e) => {
            e.preventDefault()
            const userData = {
                username: this.element.elements.name.value,
                email: this.element.elements.email.value,
                mobile: this.element.elements.mobile.value,
                password: this.element.elements.password.value
            }
            const data = await dataService.registerUser(userData);
            this.renderLogInForm();
        });
        // Show login form
        const loginLink = this.element.querySelector('.login-link');
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            this.renderLogInForm();

        })
    };

    renderRegisterForm() {
        this.element.innerHTML = registerView();
    };

    renderLogInForm() {
        this.element.innerHTML = loginView();
        
    };

    submitLogInEventListener() {
        
    }

    
}