import dataService from '../../services/DataService.js';
import pubSub from '../../services/PubSub.js';
import { registerView } from '../views/registerView.js';
import { loginView } from '../views/loginView.js';
import ErrorController from './ErrorController.js';
import BaseController from './BaseController.js';

export default class LoginFormController extends BaseController{

    constructor(element) {
        super(element)
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
            this.publish(this.topics.LOADING)
            try {
                const data = await dataService.loginUser(userData);
                const accessToken = data.accessToken;
                await dataService.saveToken(accessToken);
                window.location.href = '/index.html'              
            } catch (error) {
                this.publish(this.topics.ERROR)
                console.log('Error trying to log in')
            } finally {
                this.publish(this.topics.LOADED)
            }
        });
    };

    renderLoginForm() {       
        this.element.innerHTML = loginView();        
    };

    
}