import dataService from '../../services/DataService.js'
import pubSub from '../../services/PubSub.js'
import { postDetailView } from '../views/postDetailView.js'
import { errorView } from '../views/errorView.js'
import PostListController from './PostListController.js'


const POSTS_ERROR = 'posts_err';
const API_ERROR = 'api_err';

export default class PostDetailController {

    constructor(element, context) {
        this.element = element;
        this.context = context;

        this.loadPost(context.linkTo)
            .then(() => {
            this.element.querySelector('#back-btn').addEventListener('click', () => {
                this.goBack(context.scrollY);
            })
        })
        // });

    }

    async loadPost(id) {
        pubSub.publish('loading', {})
        try {
            const data = await dataService.getSinglePost(id)
            this.render(data)
        } catch (err) {
            const error = document.createElement('div');
            error.innerHTML = errorView(API_ERROR, err);
            this.element.innerHTML = '';
            this.element.appendChild(error);
            await this.element.querySelector('.delete').addEventListener('click', () => {
                this.goBack(this.context.scrollY)
            })
            throw new Error('ERROR CONSULTANDO A LA API DE ANUNCIOS')
        } finally {
            pubSub.publish('loaded', {});
        }
    }

    render(post) {
        const section = document.createElement('section');
        section.innerHTML = postDetailView(post);
        const tempHTML = this.element.innerHTML;
        this.element.innerHTML = '';
        new Promise((resolve, reject) => {
            this.element.appendChild(section);
            resolve(window.scroll(0, 0))
        });
    }

    goBack(scrollY) {
        this.element.innerHTML = '';
        new PostListController(this.element, scrollY)

    }
}