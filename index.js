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

    function render(posts) {
        const postList = document.querySelector('.main');
        for (const post of posts) {
            const article = document.createElement('article');
            article.innerHTML = `
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                    <div class="media-content">
                        <p class="title is-4">${post.title}</p>
                        <p class="subtitle is-6">@${post.author}</p>
                    </div>
                    </div>

                    <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br>
                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                    </div>
                </div>
            </div>
            `
            postList.appendChild(article);
        }
    }

    const posts = await loadPosts()
    render(posts)
})