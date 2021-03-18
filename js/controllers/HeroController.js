import dataService from '../../services/DataService.js'
import { heroView } from '../views/heroView.js'
import BaseController from './BaseController.js'
import PostListController from './PostListController.js';
import SearchController from './SearchController.js'

export default class HeroController extends BaseController {
    constructor(element, subtitle) {
        super(element)
        this.subtitle = subtitle;

        const ellipsis = this.element.querySelector('.lds-ellipsis');
        
        // this.renderHero()
        this.showHtml().then(() => {
            this.typeSelectorEventListener();
            this.clickAnywhereEventListener();
            this.compraEventListener();
            this.ventaEventListener();
            if (this.element.querySelector('.logout')) {
                this.userLogoutEventListener();
            }
            if (this.element.querySelector('.login')) {
                this.userLoginEventListerner();
            }
            const searchField = this.element.querySelector('.search');
            new SearchController(searchField);
            this.subscribe(this.topics.LOADING, () => {
                this.element.querySelector('.title').innerHTML = 'Esperando <div class="lds-ellipsis is-hidden"><div></div><div></div><div></div><div></div></div>';
                this.element.querySelector('.lds-ellipsis').classList.remove('is-hidden');
            });            
            this.subscribe(this.topics.LOADED, () => {
                this.element.querySelector('.lds-ellipsis').classList.add('is-hidden');
                this.element.querySelector('.title').innerHTML = 'Nodepop <div class="lds-ellipsis is-hidden"><div></div><div></div><div></div><div></div></div>';
            });
        });

    }

    // async renderHero() {
    //     if(await dataService.getToken() != null) {
    //         this.getUser().then(async () => {

    //             this.subscribe(this.topics.LOADING, () => {
    //                 this.element.querySelector('.title').innerHTML = 'Esperando <div class="lds-ellipsis is-hidden"><div></div><div></div><div></div><div></div></div>';
    //                 this.element.querySelector('.lds-ellipsis').classList.remove('is-hidden');
    //             });
                
    //             this.subscribe(this.topics.LOADED, () => {
    //                 this.element.querySelector('.lds-ellipsis').classList.add('is-hidden');
    //                 this.element.querySelector('.title').innerHTML = 'Nodepop <div class="lds-ellipsis is-hidden"><div></div><div></div><div></div><div></div></div>'
        
    //             })
    //             await this.showHtml().then(() => {
    //                 this.typeSelectorEventListener();
    //                 this.clickAnywhereEventListener();
    //                 this.compraEventListener();
    //                 this.ventaEventListener()
    //             });
    //             this.userLogoutEventListener();
    //         });
    //     } else {         
    //         this.element.innerHTML = heroView(this.subtitle)
    //         this.userLoginEventListerner()
    //     }
    // }
    
    async showHtml() {
        await this.getUser().then((user) => {
            this.user = user
        })
        this.element.innerHTML = heroView(this.subtitle, this.user);
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
        return user;         
    }

    typeSelectorEventListener() {
        const selector = this.element.querySelector('.type-select');
        if(selector) {
            selector.addEventListener('click', (e) => {
                this.element.querySelector('.selector').classList.toggle('is-hidden')
            }); 
        }
    }

    clickAnywhereEventListener() {
        const selectorBox = this.element.querySelector('.selector');
        const selector = this.element.querySelector('.type-select');
        const arrow = this.element.querySelector('i.fas.fa-sort-down')
        document.addEventListener('click', (e) => {
            if(!selectorBox.classList.contains('is-hidden') && e.target != selector && e.target != arrow) {
                selectorBox.classList.add('is-hidden');
            }
        })
    }

    compraEventListener() {
        const compraLink = this.element.querySelector('.compra-selector');
        compraLink.addEventListener('click', (e) => {
            this.element.querySelector('.selector').classList.toggle('is-hidden')
            // this.publish(this.topics.LOAD_COMPRA, {})
            this.element.querySelector('.type-select').innerHTML = 'Compra <i class="fas fa-sort-down"></i>'
            this.publish(this.topics.MODE_COMPRA, {})
            console.log("publico evento => activar modo compra!")
            // const main = document.querySelector('.main')
            // new PostListController(main, "Compra")
            // console.log("new controller instantiaited")
        })
    }

    ventaEventListener() {
        const ventaLink = this.element.querySelector('.venta-selector');
        ventaLink.addEventListener('click', e => {
            this.element.querySelector('.selector').classList.toggle('is-hidden')
            this.element.querySelector('.type-select').innerHTML = 'Venta'
            window.location.href = '/index.html'
        })
    }
}