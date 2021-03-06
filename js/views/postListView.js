export const postListView = (post) => {
    return `
        <div class="card mb-5">
            <div class="card-image">
                <div class="link" href="${post.id}">
                    <figure class="image list is-4by3">
                        <img src="${ post.image ? post.image : 'https://bulma.io/images/placeholders/1280x960.png' }" alt="Placeholder image">
                    </figure>
                </div>
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
                    <p class="post-description">${post.description}</p>
                    <a href="#">#css</a> <a href="#">#responsive</a>
                    <br>
                    <time datetime="2016-1-1">${post.updatedAt}</time>
                </div>
            </div>
        </div>
    `
}