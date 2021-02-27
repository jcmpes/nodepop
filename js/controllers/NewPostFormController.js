import dataService from '../../services/DataService.js';
import pubSub from '../../services/PubSub.js';
import { registerView } from '../views/registerView.js';
import { loginView } from '../views/loginView.js';
import { newPostView } from '../views/newPostView.js';
import BaseController from './BaseController.js';

export default class NewPostFormController extends BaseController {

    constructor(element) {
        super(element)


        this.subscribe(this.topics.NEW_POST, () => {
            
        });

        this.subscribe(this.topics.LOADING, () => {
            
        })

        this.element.innerHTML = newPostView()
        this.imageSelectedEventListener();
        this.submitEventListener();
    };

    submitEventListener() {
        this.element.addEventListener('submit', async (e) => {
            e.preventDefault();

            const postData = {
                type: this.element.elements.type.value,
                title: this.element.elements.title.value,
                price: this.element.elements.price.value,
                description: this.element.elements.description.value,
            };

            if (this.element.elements.image.files.length > 0) {
                postData.image = this.element.elements.image.files[0];
            };
            this.publish(this.topics.LOADING);
            try {
                await dataService.savePost(postData);
                window.location.href = '/?message=postSaved';
            } catch (error) {
                this.publish(this.topics.ERROR, error);
            } finally {
                this.publish(this.topics.LOADED);
            }
        })
    };

    imageSelectedEventListener() {
        const fileField = document.querySelector('.file-input');
        console.log(fileField)
        const fileNameSpan = this.element.querySelector('.file-name')
        fileField.addEventListener('change', () => {
            const fileName = fileField.files[0].name;
            fileNameSpan.innerHTML = fileName;
        })
    }
    
}