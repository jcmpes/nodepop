import pubSub from '../../services/PubSub.js'
import { postDetailView } from '../views/postDetailView.js'
import { errorView } from '../views/errorView.js'


const POSTS_ERROR = 'posts_err';
const API_ERROR = 'api_err';

export default class PostDetailController {

    constructor(element) {
        this.element = element;

        pubSub.subscribe('detail', (linkTo) => {
            this.element.innerHTML = '';
            console.log('LOAD NEW POST NOW')
            this.loadPost(linkTo)
        })
    }

    async loadPost(id) {
        const url = `http://localhost:8000/api/posts/${id}9`;
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
        this.element.appendChild(section)
    }
}