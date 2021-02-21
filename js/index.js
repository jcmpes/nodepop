import PostListController from './controllers/PostListController.js';
import LoaderController from './controllers/LoaderController.js';

window.addEventListener('DOMContentLoaded', async (e) => {
    const loader = document.querySelector('.lds-ring')
    new LoaderController(loader)
    
    const postList = document.querySelector('.main');
    const postListController = new PostListController(postList);
    postListController.loadPosts("Venta")
   

    


})