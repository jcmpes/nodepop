import BaseController from "./BaseController.js";


export default class SearchController extends BaseController {
    constructor(element) {
        super(element)

        this.element.innerHTML = '<form class="search-form"><input type="text" name="query"></input></form>';

        const form = this.element.querySelector('.search-form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.publish(this.topics.SEARCH, { query: form.elements.query.value, mode:this.mode })
        })
    }

    

}