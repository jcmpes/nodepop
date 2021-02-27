export const newPostView = () => {
    return `
        <div class="control">
            <div class="field-label is-normal">
                <label class="label">¿Compra o Venta?</label>
            </div>
            <div class="select">
                <select>
                    <option>Venta</option>
                    <option>Compra</option>
                </select>
            </div>
        </div>

        <div class="control">
            <div class="field-label is-normal">
                <label class="label">Título</label>
            </div>
            <input class="input" name="title" type="text" placeholder="Título">
        </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
                <label class="label">Descripción</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <textarea class="textarea" placeholder="Explain how we can help you"></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="file has-name is-boxed">
            <label class="file-label">
                <input class="file-input" type="file" name="image" accept="image/*">
                <span class="file-cta">
                <span class="file-icon">
                    <i class="fas fa-upload"></i>
                </span>
                <span class="file-label">
                    Choose a file…
                </span>
                </span>
                <span class="file-name">
                Screen Shot 2017-07-29 at 15.54.25.png
                </span>
            </label>
        </div>

        <div class="field is-grouped">
            <p class="control">
                <a class="button is-primary">
                    Submit
                </a>
            </p>
            <p class="control">
                <a class="button is-light">
                    Cancel
                </a>
            </p>
        </div>
    `
}