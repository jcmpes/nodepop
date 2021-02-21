import pubSub from  '../../services/PubSub.js'
import { postListView } from '../views/postListView.js';
import { errorView } from '../views/errorView.js'

export default class PostListController {

    constructor(element) {
        this.element = element;
    }

    async loadPosts(type) {
        const url = 'http://localhost:8000/api/posts'
        // debugger;
        pubSub.publish('loading', {})
        const response = await fetch(url);
        if(response.ok) {            
            const data = await response.json();
            console.log('ANUNCIOS', data);
            pubSub.publish('loaded', {})
            this.render(data, type)
        } else {
            throw new Error('ERROR CONSULTANDO A LA API DE ANUNCIOS')
        }
    }

     render(posts, type) {
        // State of no ads to show
        if (posts.length == 0) {
            const error = document.createElement('div');
            error.innerHTML = errorView();
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
