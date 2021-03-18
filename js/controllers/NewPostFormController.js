import dataService from '../../services/DataService.js';
import pubSub from '../../services/PubSub.js';
import { registerView } from '../views/registerView.js';
import { loginView } from '../views/loginView.js';
import { newPostView } from '../views/newPostView.js';
import BaseController from './BaseController.js';

export default class NewPostFormController extends BaseController {

    constructor(element) {
        super(element)

        this.element.innerHTML = newPostView()
        this.imageSelectedEventListener();
        this.submitEventListener();
    };

    submitEventListener() {
        this.element.addEventListener('submit', async (e) => {
            e.preventDefault();

            /*
            * SANITIZE DATA
            */
            let postData = {
                type: this.element.elements.type.value,
                title: this.element.elements.title.value.replace(/(<|>)+/g, ''),
                price: this.element.elements.price.value.replace(/(<|>)+/g, ''),
                description: this.element.elements.description.value.replace(/(<|>)+/g, ''),
            };

            if (this.element.elements.image.files.length > 0) {
                postData.image = this.element.elements.image.files[0];
            };

            

            this.publish(this.topics.LOADING);
            try {
                await dataService.savePost(postData);
                window.location.href = '/'
            } catch (error) {
                this.publish(this.topics.ERROR, error);
            } finally {
                this.publish(this.topics.LOADED);
            }
        })
    };

    imageSelectedEventListener() {
        const fileField = document.querySelector('.file-input');
        const fileNameSpan = this.element.querySelector('.file-name')
        fileField.addEventListener('change', () => {
            const fileName = fileField.files[0].name;
            fileNameSpan.innerHTML = fileName;
        })
    }

    
}