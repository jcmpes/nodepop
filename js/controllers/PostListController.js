import pubSub from  '../../services/PubSub.js'
import { postListView } from '../views/postListView.js';
import { errorView } from '../views/errorView.js'
import PostDetailController from './PostDetailController.js';

const POSTS_ERROR = 'posts_err';
const API_ERROR = 'api_err';

export default class PostListController {

    constructor(element) {
        this.element = element;

        // Create an instance of detail view when 
        pubSub.subscribe('detail', (linkTo) => {
            console.log(linkTo)
            new PostDetailController(this.element)
        })

        // Load posts
        this.loadPosts('Venta').then(() => {
            // Listen for a click on an ad
            this.element.querySelectorAll('.link').forEach(link => {
                link.addEventListener('click', (e) => {
                    const linkTo = e.target.parentElement.parentElement.attributes.href.value;
                    pubSub.publish('detail', linkTo)
                })

            })
        })

    }

    async loadPosts(type) {
        const url = 'http://localhost:8000/api/posts'
        pubSub.publish('loading', {})
        const response = await fetch(url);
        if(response.ok) {            
            const data = await response.json();
            console.log('ANUNCIOS', data);
            pubSub.publish('loaded', {})
            this.render(data, type)
        } else {
            const error = document.createElement('div');
            error.innerHTML = errorView(API_ERROR);
            this.element.appendChild(error);
            pubSub.publish('loaded', {})
            throw new Error('ERROR CONSULTANDO A LA API DE ANUNCIOS')
        }
        
    }

     render(posts, type) {
        // State of no ads to show
        if (posts.length == 0) {
            const error = document.createElement('div');
            error.innerHTML = errorView(POSTS_ERROR);
            this.element.appendChild(error)
        }
        for (const post of posts) {
            if (post.type == type) {
                const article = document.createElement('article');
                article.innerHTML = postListView(post)
                this.element.appendChild(article);
            }
        }
    }

}
