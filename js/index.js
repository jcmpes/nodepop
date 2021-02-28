import PostListController from './controllers/PostListController.js';
import LoaderController from './controllers/LoaderController.js';
import HeroController from './controllers/HeroController.js';
import OptionsController from './controllers/OptionsController.js';
import MessageController from './controllers/ErrorController.js'

window.addEventListener('DOMContentLoaded', async (e) => {
    const loader = document.querySelector('.lds-ring')
    new LoaderController(loader)

    const hero = document.querySelector('.hero')
    new HeroController(hero, "Venta")
    
    const main = document.querySelector('.main');
    new PostListController(main);

    const message = document.querySelector('.message');
    new MessageController(message);

    const options = document.querySelector('.options');
    new OptionsController(options);

})