import pubSub from '../../services/PubSub.js';
import { heroView } from '../views/heroView.js'
import BaseController from '../controllers/BaseController.js'

export default class HeroController extends BaseController {
    constructor(element, type) {
        super(element)
        const ellipsis = this.element.querySelector('.lds-ellipsis');
    
        this.element.innerHTML = heroView(type)

        this.subscribe(this.topics.LOADING, () => {
            this.element.querySelector('.title').innerHTML = 'Esperando <div class="lds-ellipsis is-hidden"><div></div><div></div><div></div><div></div></div>';
            this.element.querySelector('.lds-ellipsis').classList.remove('is-hidden');
        });
        
        this.subscribe(this.topics.LOADED, () => {
            this.element.querySelector('.lds-ellipsis').classList.add('is-hidden');
            this.element.querySelector('.title').innerHTML = 'Nodepop <div class="lds-ellipsis is-hidden"><div></div><div></div><div></div><div></div></div>'

        })
    }


}