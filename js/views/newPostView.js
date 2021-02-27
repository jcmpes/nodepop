export const newPostView = () => {
    return `
        <div class="control">
            <div class="field-label is-normal">
                <label class="label">¿Compra o Venta?</label>
            </div>
            <div class="select is-rounded">
                <select name="type">
                    <option>Venta</option>
                    <option>Compra</option>
                </select>
            </div>
        </div>

        <div class="control">
            <div class="field-label is-normal">
                <label class="label">Título</label>
            </div>
            <input class="input is-rounded" name="title" type="text" placeholder="Título">
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Descripción</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <textarea name="description" class="textarea is-rounded" placeholder="Escribe aqui una descripción..."></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Precio</label>
            </div>
            <div class="field has-addons">
                <p class="control">
                    <input name="price" class="input is-rounded" type="text" placeholder="Precio">
                </p>
                <p class="control">
                    <a class="button is-static is-rounded">
                    €
                    </a>
                </p>
            </div>
        </div>

        <div class="field-label is-normal">
            <label class="label">Imagen</label>
        </div>
        <div class="file has-name is-boxed">
            <label class="file-label">
                <input class="file-input" type="file" name="image" accept="image/*">
                <span class="file-cta">
                    <span class="file-icon">
                        <i class="fas fa-upload"></i>
                    </span>
                    <span class="file-label">
                        Elige una imagen…
                    </span>
                </span>
                <span class="file-name"></span>
            </label>
        </div>

        <div class="field is-grouped">
            <p class="control">
                <button class="button is-primary is-rounded">
                    Submit
                </button>
            </p>
            <p class="control">
                <button class="button is-light is-rounded">
                    Cancel
                </button>
            </p>
        </div>
    `
}