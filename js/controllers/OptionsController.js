import { optionsView } from '../views/optionsView.js'


export default class OptionsController {

    constructor(element) {
        this.element = element;
        this.renderOptions();
    }

    renderOptions() {
        this.element.innerHTML = optionsView()
    }
}

