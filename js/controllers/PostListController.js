import dataService from '../../services/DataService.js'
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
            // Instance a new post detail object passing the page scroll information
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
                link.addEventListener('click', (e) => {
                    // Remember scrollY position
                    const scrollY = e.pageY - e.clientY;
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
        pubSub.publish('loading', {})
        try {
            const data = await dataService.getPosts();
            // Format date
            data.map((post) => {
                const serverFormat = post.updatedAt;
                post.updatedAt = serverFormat.replace(/T([^Z]*)Z/, '')
            })
            this.render(data, "Venta")
        // Control error if data is not received
        } catch (err) {
            const error = document.createElement('div');
            error.innerHTML = errorView(API_ERROR, err);
            this.element.appendChild(error);     
            throw new Error('ERROR CONSULTANDO A LA API DE ANUNCIOS')
        } finally {
            pubSub.publish('loaded', {})
        }       
    }

     render(posts, type) {
        // State to show when the posts array is empty
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
