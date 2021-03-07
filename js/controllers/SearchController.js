import BaseController from "./BaseController.js";


export default class SearchController extends BaseController {
    constructor(element) {
        super(element)

        this.element.innerHTML = '<form class="search-form"><input type="text"></input></form>';

        const form = this.element.querySelector('.search-form');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            
        })
    }

    

}