import pubSub from  '../../services/PubSub.js'
import { postListView } from '../views/postListView.js';
import { errorView } from '../views/errorView.js'
import PostDetailController from './PostDetailController.js';

const POSTS_ERROR = 'posts_err';
const API_ERROR = 'api_err';

export default class PostListController {

    constructor(element, scrollY=0) {
        this.element = element;
        this.scrollY = scrollY;
        // Create an instance of detail view when 'detail' event is heard
        pubSub.subscribe('detail', (context) => {
            console.log('POST ID, SCROLL', context.linkTo, context.scrollY)
            new PostDetailController(this.element, context)
        })

        // Load posts
        this.element.innerHTML = '';
        this.loadPosts('Venta').then(() => {
            // Listen for a click on a post
            console.log('SCROLL DE VUELTA', scrollY);
            if(this.scrollY != 0) {
                window.scroll(0, scrollY);
            }
            this.element.querySelectorAll('.link').forEach(link => {
                console.log('CLICK ON LINK')
                link.addEventListener('click', (e) => {
                    const scrollY = e.pageY - e.clientY;
                    console.log(e);
                    const linkTo = e.target.parentElement.parentElement.attributes.href.value;
                    const context = {
                        'scrollY': scrollY,
                        'linkTo': linkTo
                    }
                    pubSub.publish('detail', context)
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
