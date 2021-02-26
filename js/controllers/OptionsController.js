import dataService from '../../services/DataService.js'
import { optionsView } from '../views/optionsView.js'


export default class OptionsController {

    constructor(element) {
        this.element = element;
        this.user = {}

        this.renderOptions();
    }

    async renderOptions() {
        if(await dataService.getToken() != null) {
            this.getUser().then(() => {
                this.element.innerHTML = optionsView(this.user);
                this.userLogoutEventListener();
            });
        } else {
            
            this.element.innerHTML = optionsView()
            this.userLoginEventListerner()
        }

        
        
        
    }

    async getUser() {
        const user = await dataService.getUser()
        this.user = user;
        return user;         
    }

    userLogoutEventListener() {
        const logoutBtn = this.element.querySelector('.logout');
        logoutBtn.addEventListener('click', () => {
            dataService.logout();
            window.location.href = '/index.html'
        })
    }

    userLoginEventListerner() {
        const loginBtn = this.element.querySelector('.login');
        loginBtn.addEventListener('click', () => {
            window.location.href = '/register.html'
        })
    }




    
}

