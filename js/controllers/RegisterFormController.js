import dataService from '../../services/DataService.js'

export default class RegisterFormController {

    constructor(element) {
        this.element = element
        this.newEventListener();
    }

    newEventListener() {
        const submit = this.element.querySelector('#submit-btn')
        submit.addEventListener('click', () => {
            const userData = {
                username: this.element.elements.name.value,
                email: this.element.elements.email.value,
                mobile: this.element.elements.mobile.value,
                password: this.element.elements.password.value
            }
            const data = await dataService.registerUser(userData)
        })
    }

    
}