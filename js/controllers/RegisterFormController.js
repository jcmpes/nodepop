import dataService from '../../services/DataService.js';
import pubSub from '../../services/PubSub.js';
import { registerView } from '../views/registerView.js';
import { loginView } from '../views/loginView.js';
import LoginFormController from '../controllers/LoginFormController.js'

export default class RegisterFormController {

    constructor(element) {
        this.element = element
        this.renderRegisterForm();
        this.actionsEventListener();

        pubSub.subscribe('login', () => {
            new LoginFormController(this.element);
        })
    };

    actionsEventListener() {
        // Submit registration 
        this.element.addEventListener('submit', async (e) => {
            if (e.submitter.id == "submit-btn") {
                // Only for the register form
                e.preventDefault()
                console.log(e)
                const userData = {
                    username: this.element.elements.name.value,
                    email: this.element.elements.email.value,
                    mobile: this.element.elements.mobile.value,
                    password: this.element.elements.password.value
                }
                const data = await dataService.registerUser(userData);
                this.renderLogInForm();
            }
        });
        // Show login form
        const loginLink = this.element.querySelector('.login-link');
        loginLink.addEventListener('click', (e) => {
            e.preventDefault();
            pubSub.publish('login', {})
            // this.renderLogInForm();

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