import BaseController from "./BaseController.js";
import { searchView } from "../views/searchView.js"

export default class SearchController extends BaseController {
    constructor(element) {
        super(element)

        this.element.innerHTML = searchView();

        const form = this.element.querySelector('.search-form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.publish(this.topics.SEARCH, { query: form.elements.query.value, mode:this.mode })
        });

        const searchIcon = this.element.querySelector('#search-icon');
        const searchField = this.element.querySelector('#search-field')
        searchIcon.addEventListener('click', () => {
            searchField.focus();
        })
    }

    

}