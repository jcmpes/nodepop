import dataService from '../../services/DataService.js';
import pubSub from '../../services/PubSub.js';
import { registerView } from '../views/registerView.js';
import { loginView } from '../views/loginView.js';
import LoginFormController from '../controllers/LoginFormController.js'
import BaseController from '../controllers/BaseController.js'

export default class RegisterFormController extends BaseController {

    constructor(element) {
        super(element)

        this.renderRegisterForm();
        this.actionsEventListener();

        this.subscribe('login', () => {
            new LoginFormController(this.element);
        });

        this.subscribe(this.topics.LOADING, () => {
            
        })
    };

    actionsEventListener() {
        // Submit registration 
        this.element.addEventListener('submit', async (e) => {
            if (e.submitter.id == "submit-btn") {
                // Only for the register form
                e.preventDefault()
                const userData = {
                    username: this.element.elements.name.value,
                    email: this.element.elements.email.value,
                    mobile: this.element.elements.mobile.value,
                    password: this.element.elements.password.value
                }
                this.publish(this.topics.LOADING)
                try{
                    const data = await dataService.registerUser(userData);
                    this.renderLogInForm();
                } catch (error) {
                    pubSub.publish(this.topics.ERROR)
                } finally {
                    pubSub.publish(this.topics.LOADED)
                }
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