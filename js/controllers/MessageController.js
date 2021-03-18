import pubSub from '../../services/PubSub.js'
import BaseController from './BaseController.js'

export default class MessageController extends BaseController {
    
    constructor(element) {

        super(element);      

        this.subscribe(this.topics.POST_DELETED, () => {
            this.hideMessageAfterMiliseconds(3000);
            this.deleteButtonHandler();
            this.showMesssage('Has eliminado tu anuncio');
        });

    }

    showMesssage(msg) {
        this.element.querySelector('.message-string').innerHTML = msg;
        this.element.classList.remove('is-hidden');
    }

    deleteButtonHandler() {
        this.element.addEventListener('click', (event) => {
            const deleteButton = this.element.querySelector('.delete');
            if (event.target == deleteButton) {
                clearTimeout(this.delayedHide);
                this.hideMessageElement()
            }
        })
    }
    
    hideMessageAfterMiliseconds(n) {
        this.delayedHide = setTimeout(() => {
            this.hideMessageElement()
        }, n) 
    }

    hideMessageElement() {
        // Start animation to hide element
        this.element.style.animation = 'hideMessage .8s forwards';
        this.element.style.animationPlayState = 'running';

        // Remove element after animation has finished
        this.element.addEventListener('animationend', () => {
            this.element.classList.add('is-hidden');
        });
    }
}