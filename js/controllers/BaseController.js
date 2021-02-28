import pubSub from '../../services/PubSub.js'
import dataService from '../../services/DataService.js'

export default class BaseController {

    constructor(element) {
        this.element = element;
        this.pubSub = pubSub;
        this.topics = {
            LOADING: 'loading',
            LOADED: 'loaded',
            ERROR: 'error',
            NEW_POST: 'newPost',
            POST_DELETED: 'deletedPost',
            LOAD_COMPRA: 'load_compra'
        }
    }

    subscribe(eventName, eventHandler) {
        this.pubSub.subscribe(eventName, eventHandler);
    }

    publish(eventName, eventHandler) {
        this.pubSub.publish(eventName, eventHandler);
    }
}