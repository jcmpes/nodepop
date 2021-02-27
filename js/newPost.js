import LoaderController from './controllers/LoaderController.js';
import HeroController from './controllers/HeroController.js';
import NewPostFormController from './controllers/NewPostFormController.js'

window.addEventListener('DOMContentLoaded', async (e) => {
    const loader = document.querySelector('.lds-ring')
    new LoaderController(loader)

    const hero = document.querySelector('.hero')
    new HeroController(hero, "New Post")
    
    const main = document.querySelector('.main')
    new NewPostFormController(main)
})