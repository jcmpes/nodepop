import PostListController from './controllers/PostListController.js';
import LoaderController from './controllers/LoaderController.js';
import HeroController from './controllers/HeroController.js';
import OptionsController from './controllers/OptionsController.js';

window.addEventListener('DOMContentLoaded', async (e) => {
    const loader = document.querySelector('.lds-ring')
    new LoaderController(loader)

    const hero = document.querySelector('.hero')
    new HeroController(hero, "Venta")
    
    const postList = document.querySelector('.main');
    const postListController = new PostListController(postList);

    const options = document.querySelector('.options');
    new OptionsController(options)

})