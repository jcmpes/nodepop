export const errorView = (type) => {
    if (type == 'posts_err') {
        return `
            <article class="message is-warning">
                <div class="message-header">
                    <p>Warning</p>
                    <button class="delete" aria-label="delete"></button>
                </div>
                <div class="message-body">
                    <p>No hay anuncios en esta categoría. <a href="/">¿Quieres volver a la página de inicio?</a></p>
                </div>
            </article>
        `
    }
    if (type == 'api_err') {
        return `
        <article class="message is-danger">
            <div class="message-header">
                <p>Error</p>
                <button class="delete" aria-label="delete"></button>
            </div>
            <div class="message-body">
                Error al cargar los anuncios. La carga de anuncios desde el servidor ha fallado, intentalo de nuevo.
            </div>
        </article>
        `
    }

}