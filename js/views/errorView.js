export const errorView = () => {
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