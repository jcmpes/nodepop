import pubSub from '../../services/PubSub.js';
import BaseController from '../controllers/BaseController.js';

export default class LoaderController extends BaseController {
    constructor(element) {
        super(element);

        this.subscribe(this.topics.LOADING, () => {
            this.element.classList.remove('is-hidden');
        });
        
        this.subscribe(this.topics.LOADED, () => {
            this.element.classList.add('is-hidden')
        });
    }


}