import pubSub from '../../services/PubSub.js'
import { postDetailView } from '../views/postDetailView.js'

export default class PostDetailController {

    constructor(element) {
        this.element = element

        pubSub.subscribe('detail', (linkTo) => {
            this.element.innerHTML = '';
            console.log('LOAD NEW POST NOW')
            this.loadPost(linkTo)
        })
    }

    async loadPost(id) {
        const url = `http://localhost:8000/api/posts/${id}`;
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log('ANUNCIO', data);
            this.render(data);
        } else {
            throw new Error('ERROR CONSULTANDO EL ANUNCIO EN LA API')
        }
    }

    render(post) {
        const section = document.createElement('section');
        section.innerHTML = postDetailView(post);
        this.element.appendChild(section)
    }
}