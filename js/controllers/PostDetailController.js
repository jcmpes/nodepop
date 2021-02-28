import dataService from '../../services/DataService.js'
import pubSub from '../../services/PubSub.js'
import { postDetailView } from '../views/postDetailView.js'
import { errorView } from '../views/errorView.js'
import PostListController from './PostListController.js'
import BaseController from './BaseController.js'
import MessageController from './MessageController.js'


const POSTS_ERROR = 'posts_err';
const API_ERROR = 'api_err';

export default class PostDetailController extends BaseController {

    constructor(element, context) {
        super(element)
        this.element = element;
        this.context = context;

        
        this.loadPost(context.linkTo)
            .then(() => {
            this.element.querySelector('#back-btn').addEventListener('click', () => {
                this.goBack(context.mode, context.scrollY);
            });
            this.removePostEventListener().then(() => {
                this.goBack(context.mode, context.scrollY)

            })
        })

        

    }

    async loadPost(id) {
        this.publish(this.topics.LOADING, {})
        try {
            const data = await dataService.getSinglePost(id)
            // Format date
            const serverFormat = data.updatedAt;
            data.updatedAt = serverFormat.replace(/T([^Z]*)Z/, '')
            // Add post author
            const userId = await dataService.getAuthor(data['userId'])
            data['author'] = userId
            // Get userId to send to the view
            const user = await dataService.getUser()
            this.render(data, user)
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
            this.publish(this.topics.LOADED, {});
        }
    }

    render(post, user) {
        const section = document.createElement('section');
        section.innerHTML = postDetailView(post, user);
        const tempHTML = this.element.innerHTML;
        this.element.innerHTML = '';
        new Promise((resolve, reject) => {
            this.element.appendChild(section);
            resolve(window.scroll(0, 0))
        });
    }

    goBack(mode, scrollY) {
        this.element.innerHTML = '';
        new PostListController(this.element, mode, scrollY, this.topics.POST_DELETED)
        
    }

    removePostEventListener() {
        return new Promise((resolve, reject) => {
            if(this.element.querySelector('.remove-post')) {
                const removeBtn = this.element.querySelector('.remove-post');
                removeBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (window.confirm("Tu anuncio será eliminado. Los otros usuarios dejarán de poder verlo. ¿Seguro que desas eliminar tu anuncio?")) {
                        resolve(dataService.deletePost(this.context.linkTo));
                        
                    }
                })
            }
        })
        
    }
}