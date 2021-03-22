export const newPostView = () => {
    return `
        <div class="field is-horizontal is-flex is-flex-direction-column is-align-items-start">
            <div class="field-label">
                <label class="label">¿Compra o Venta?</label>        
            </div>
            <div class="select is-rounded">
                <select class="is-pulled-right" name="type">
                    <option>Venta</option>
                    <option>Compra</option>
                </select>
            </div>  
        </div>

        <div class="field is-horizontal is-flex is-flex-direction-column is-align-items-left">
            <div class="field-label ">
                <label class="label is-pulled-left">Título</label>            
            </div>
            <div class="field-body">
                <input class="input field-body is-rounded" name="title" type="text" placeholder="Título">
            </div>
        </div>

        <div class="field is-horizontal is-flex is-flex-direction-column is-align-items-left">
            <div class="field-label">
                <label class="label is-pulled-left">Descripción</label>
            </div>
            <div class="field-body">
                <div class="field">
                    <div class="control">
                        <textarea name="description" class="textarea is-rounded" placeholder="Escribe aqui una descripción..."></textarea>
                    </div>
                </div>
            </div>
        </div>

        <div class="field is-flex is-flex-direction-column is-align-items-start">
            <div class="field-label is-normal">
                <label class="label">Precio</label>
            </div>
            <div class="field has-addons">
                <p class="control">
                    <input name="price" class="input is-rounded" type="number" placeholder="Precio">
                </p>
                <p class="control">
                    <a class="button is-static is-rounded">
                    €
                    </a>
                </p>
            </div>
        </div>

        <div class="field-label is-flex is-flex-direction-column is-align-items-start">
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

        <div class="field is-grouped mt-5">
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