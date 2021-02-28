export const postDetailView = (post, user) => {
    return `
        <button id="back-btn" class="button is-rounded">Back</button>

        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                    ${post.type}
                </p>
            </header>
            <div class="card-image">
                    <figure class="image detail is-4by3">
                        
                        <!-- <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"> -->
                        <img src="${ post.image ? post.image : 'https://bulma.io/images/placeholders/1280x960.png' }" alt="Placeholder image">
                    </figure>
                </a>
            </div>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-3">${post.price}€</p>
                        <p class="title is-4">${post.title}</p>
                        <p class="subtitle is-6">@${post.author}</p>
                    </div>
                </div>

                <div class="content">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Phasellus nec iaculis mauris.
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br>
                    <time datetime="2016-1-1">${post.updatedAt}</time>
                </div>
            </div>
            <footer class="card-footer">
                ${ post.userId == user.userId ? `
                    <a href="" class="card-footer-item remove-post">
                        Eliminar
                        <span class="icon">
                            <i class="far fa-trash"></i>
                        </span>
                    </a>
                ` 
                : `
                    <a href="#" class="card-footer-item">Comprar</a>
                    <a href="#" class="card-footer-item">Contactar</a>
                    <a href="#" class="card-footer-item">
                        Me gusta
                        <span class="icon">
                            <i class="far fa-heart"></i>
                        </span>
                    </a>
                `}
                
            </footer>
        </div>
    `
}