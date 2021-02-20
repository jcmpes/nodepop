import { postView } from './views.js'

window.addEventListener('DOMContentLoaded', async (e) => {
    async function loadPosts() {
        const url = 'http://localhost:8000/api/posts'
        const response = await fetch(url);
        if(response.ok) {
            const data = await response.json();
            // console.log('ANUNCIOS', data);
            return data
        } else {
            throw new Error('ERROR CONSULTANDO A LA API DE ANUNCIOS')
        }
    }

    function render(posts, type) {
        const postList = document.querySelector('.main');
        for (const post of posts) {
            if (post.type = type) {
                const article = document.createElement('article');
                article.innerHTML = postView(post)
                postList.appendChild(article);
            }
        }
    }

    const posts = await loadPosts()
    render(posts, "Venta")
})