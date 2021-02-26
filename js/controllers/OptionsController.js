import { optionsView } from '../views/optionsView.js'


export default class OptionsController {

    constructor(element) {
        this.element = element;
        if(this.checkToken()) {
            this.renderOptions();
        }
    }

    renderOptions() {
        this.element.innerHTML = optionsView()
    }

    checkToken() {
        if (localStorage.getItem('accessToken')) {
            return true
        } else {
            return false;
        }
    }
}

