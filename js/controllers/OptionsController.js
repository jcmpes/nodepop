import dataService from '../../services/DataService.js'
import { optionsView } from '../views/optionsView.js'


export default class OptionsController {

    constructor(element) {
        this.element = element;
        this.user = {}

        this.renderOptions();
    }

    async renderOptions() {
        if(await dataService.getToken() != null) {
                this.element.innerHTML = optionsView(true);
        } else {          
            this.element.innerHTML = optionsView(false)
        }       
        
    }




    
}

