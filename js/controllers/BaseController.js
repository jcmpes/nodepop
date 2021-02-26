import pubSub from '../../services/PubSub.js'

export default class BaseController {

    constructor(element) {
        this.element = element;
        this.pubSub = pubSub;
        this.topics = {
            LOADING: 'loading',
            LOADED: 'loaded',
            ERROR: 'error',
        }
    }

    subscribe(eventName, eventHandler) {
        this.pubSub.subscribe(eventName, eventHandler);
    }

    publish(eventName, eventHandler) {
        this.pubSub.publish(eventName, eventHandler);
    }
    
}