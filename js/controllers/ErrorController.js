import pubSub from '../../services/PubSub.js'

export default class ErrorController {
    
    constructor(element) {
        // this.showLogic();
        this.element = element;
        

        pubSub.subscribe('Error', () => {
            this.hideMessageAfterMiliseconds(3000);
            this.deleteButtonHandler();
            this.showMesssage("Error: User not authorized")
        })
    }
    
    showMesssage(msg) {
        this.element.querySelector('.message-string').innerHTML = msg
        this.element.classList.remove('is-hidden');
    }

    // Show message if param is found in the url
    // showLogic() {
    //     const url = window.location.href;
    //     const params = url.split('?')
    //     console.log(params[1].split('='))
    //     if( params[1].split('=')[0] == 'mensage') {
    //         const messageParam = params[1].split('=')[1]
    //         const objectMessage = {
    //             msg: messageParam
    //         }
    //         if (objectMessage.msg == NEW_TWEET_PARAM) {
    //             this.showMesssage(NEW_TWEET)
    //         }
    //     }
    // }

    deleteButtonHandler() {
        this.element.addEventListener('click', (event) => {
            console.log(event)
            const deleteButton = this.element.querySelector('.delete');
            if (event.target == deleteButton) {
                clearTimeout(this.delayedHide);
                this.hideMessageElement()
            }
        })
    }
    
    hideMessageAfterMiliseconds(n) {
        this.delayedHide = setTimeout(() => {
            this.hideMessageElement()
        }, n) 
    }

    hideMessageElement() {
        // Start animation to hide element
        this.element.style.animation = 'hideMessage .8s forwards';
        this.element.style.animationPlayState = 'running';

        // Remove element after animation has finished
        this.element.addEventListener('animationend', () => {
            this.element.classList.add('is-hidden');
        });
    }
}