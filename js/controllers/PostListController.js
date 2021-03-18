import dataService from '../../services/DataService.js'
import { postListView } from '../views/postListView.js';
import { errorView } from '../views/errorView.js'
import PostDetailController from './PostDetailController.js';
import BaseController from './BaseController.js';
import MessageController from './MessageController.js';

const POSTS_ERROR = 'posts_err';
const API_ERROR = 'api_err';

export default class PostListController extends BaseController{

    constructor(element, mode, scrollY=0, message) {
        super(element)
        this.element = element;
        this.mode = mode;
        this.scrollY = scrollY;
        
        const messageArticle = document.querySelector('.message');
        new MessageController(messageArticle);
        // Create an instance of detail view when 'detail' event is heard
        this.subscribe('detail', (context) => {
            // Instance a new post detail object passing the page scroll information
            new PostDetailController(this.element, context)
        })
        this.subscribe(this.topics.MODE_COMPRA, () => {
            this.element.innerHTML = '';
            this.mode = "Compra";
            this.loadPosts(this.mode)
        })
        this.subscribe(this.topics.SEARCH, (query) => {
            this.element.innerHTML = '';
            // debugger 
            this.loadPosts(this.mode, query.query)
        })
        this.subscribe(this.topics.NOT_FOUND, () => {
            this.element.innerHTML = `
                <div class='no-results-icon'>🧠</div>
                <h1 class='no-results-header'>Sin resultados</h1>
                <p class='no-results-text'>Nos hemos estrujado los sesos pero no tenemos los que buscas</p>
            `;
        })
        
        if(message) {
            this.publish(message)
        }

        // Load posts
        this.element.innerHTML = '';
        this.loadPosts(this.mode).then(() => {
            // Listen for a click on a post
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
                        'linkTo': linkTo,
                        'mode': this.mode
                    }
                    this.publish('detail', context)
                })

            })
        })

    }

    async loadPosts(mode, query='') {
        this.publish(this.topics.LOADING, {})
        try {
            const data = await dataService.getPosts(mode, query);
            // Format date and
            data.map(async (post) => {
                const dateServerFormat = post.updatedAt;
                post.updatedAt = dateServerFormat.replace(/T([^Z]*)Z/, '');    
            });
            // Add post author (@kas: ¿ PORQUE NO PUEDO HACER ESTO CON .map ó .forEach ?)
            for (let i = 0; i < data.length; i++) {
                data[i]['author'] = await dataService.getAuthor(data[i]['userId']);
            };

            // arr.forEach(async post => {
            //     const userServerFormat = post.userId;
            //     const postAuthor = await dataService.getAuthor(userServerFormat)
            //     post.author = postAuthor
            // })
            this.render(data)
        // Control error if data is not received
        } catch (err) {
            const error = document.createElement('div');
            error.innerHTML = errorView(API_ERROR, err);
            this.element.appendChild(error);     
            throw new Error('ERROR CARGANDO LOS ANUNCIOS')
        } finally {
            this.publish(this.topics.LOADED, {})
        }       
    }

     render(posts) {
        // State to show when the posts array is empty
        if (posts.length === 0) {
            this.publish(this.topics.NOT_FOUND)
            // const error = document.createElement('div');
            // error.innerHTML = errorView(POSTS_ERROR);
            // this.element.appendChild(error)
        }
        for (const post of posts) {
            const article = document.createElement('article');
            article.innerHTML = postListView(post)
            this.element.appendChild(article);

        }
    }

}
