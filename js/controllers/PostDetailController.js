import pubSub from '../../services/PubSub.js'
import { postDetailView } from '../views/postDetailView.js'
import { errorView } from '../views/errorView.js'
import PostListController from './PostListController.js'


const POSTS_ERROR = 'posts_err';
const API_ERROR = 'api_err';

export default class PostDetailController {

    constructor(element, context) {
        this.element = element;
        // debugger;
        // pubSub.subscribe('detail', (linkTo) => {
        //     this.tempView = this.element.innerHTML;
        //     this.element.innerHTML = '';
        //     console.log('LOAD NEW POST NOW')
        console.log(context)
            this.loadPost(context.linkTo).then(() => {
                this.element.querySelector('#back-btn').addEventListener('click', () => {
                    
                    this.goBack(context.scrollY);
                })
            })
        // });

    }

    async loadPost(id) {
        const url = `http://localhost:8000/api/posts/${id}`;
        pubSub.publish('loading', {})
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log('ANUNCIO', data);
            pubSub.publish('loaded', {})
            this.render(data);
        } else {
            const error = document.createElement('div');
            error.innerHTML = errorView(API_ERROR);
            this.element.appendChild(error);
            pubSub.publish('loaded', {})
            throw new Error('ERROR CONSULTANDO EL ANUNCIO EN LA API')
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

        console.log('scrollY', scrollY)
        new PostListController(this.element, scrollY)
        // this.element.innerHTML = this.tempView;

    }
}