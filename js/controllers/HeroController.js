import pubSub from '../../services/PubSub.js';

export default class HeroController {
    constructor(element) {
        this.element = element;
        const ellipsis = this.element.querySelector('.lds-ellipsis');
    
        pubSub.subscribe('loading', () => {
            this.element.querySelector('.title').innerHTML = 'Esperando <div class="lds-ellipsis is-hidden"><div></div><div></div><div></div><div></div></div>';
            this.element.querySelector('.lds-ellipsis').classList.remove('is-hidden');
        });
        
        pubSub.subscribe('loaded', () => {
            this.element.querySelector('.lds-ellipsis').classList.add('is-hidden');
            this.element.querySelector('.title').innerHTML = 'Nodepop <div class="lds-ellipsis is-hidden"><div></div><div></div><div></div><div></div></div>'

        })
    }


}