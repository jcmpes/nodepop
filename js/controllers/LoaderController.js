import pubSub from '../../services/PubSub.js'

export default class LoaderController {
    constructor(element) {
        this.element = element;

        pubSub.subscribe('loading', () => {
            this.element.classList.remove('is-hidden');
        });
        
        pubSub.subscribe('loaded', () => {
            this.element.classList.add('is-hidden')
        });
    }


}