import PostListController from './controllers/PostListController.js';
import LoaderController from './controllers/LoaderController.js';
import HeroController from './controllers/HeroController.js'

window.addEventListener('DOMContentLoaded', async (e) => {
    const loader = document.querySelector('.lds-ring')
    new LoaderController(loader)

    const hero = document.querySelector('.hero')
    new HeroController(hero)
    
    const postList = document.querySelector('.main');
    const postListController = new PostListController(postList);
    postListController.loadPosts("Venta")
   

    


})