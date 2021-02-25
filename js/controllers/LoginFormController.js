import dataService from '../../services/DataService.js';
import pubSub from '../../services/PubSub.js';
import { registerView } from '../views/registerView.js';
import { loginView } from '../views/loginView.js';
import ErrorController from './ErrorController.js';

export default class LoginFormController {

    constructor(element) {
        this.element = element
        this.renderLoginForm();
        this.loginEventListener();


    };

    loginEventListener() {
        // Submit registration 
        this.element.addEventListener('submit', async (e) => {
            e.preventDefault()
            const userData = {
                username: this.element.elements.name.value,
                password: this.element.elements.password.value
            }
            try {
                const data = await dataService.loginUser(userData);
                const accessToken = data.accessToken;
                await dataService.saveToken(accessToken)               
            } catch (error) {
                pubSub.publish('Error', error)
            }
        });
    };

    renderLoginForm() {       
        this.element.innerHTML = loginView();        
    };

    
}