import pubSub from '../../services/PubSub.js';
import dataService from '../../services/DataService.js'
import { heroView } from '../views/heroView.js'
import BaseController from '../controllers/BaseController.js'

export default class HeroController extends BaseController {
    constructor(element, subtitle) {
        super(element)
        this.subtitle = subtitle;

        const ellipsis = this.element.querySelector('.lds-ellipsis');
        this.user = {}
        this.renderHero();

        
    }

    async renderHero() {
        if(await dataService.getToken() != null) {
            this.getUser().then(() => {

                this.subscribe(this.topics.LOADING, () => {
                    this.element.querySelector('.title').innerHTML = 'Esperando <div class="lds-ellipsis is-hidden"><div></div><div></div><div></div><div></div></div>';
                    this.element.querySelector('.lds-ellipsis').classList.remove('is-hidden');
                });
                
                this.subscribe(this.topics.LOADED, () => {
                    this.element.querySelector('.lds-ellipsis').classList.add('is-hidden');
                    this.element.querySelector('.title').innerHTML = 'Nodepop <div class="lds-ellipsis is-hidden"><div></div><div></div><div></div><div></div></div>'
        
                })
                this.element.innerHTML = heroView(this.subtitle, this.user);
                this.userLogoutEventListener();
            });
        } else {         
            this.element.innerHTML = heroView(this.subtitle)
            this.userLoginEventListerner()
        }
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

    async getUser() {
        const user = await dataService.getUser()
        this.user = user;
        console.log(this.user)
        return user;         
    }
}