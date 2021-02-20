import PostListController from './controllers/PostListController.js';

window.addEventListener('DOMContentLoaded', async (e) => {
    const postList = document.querySelector('.main');
    const postListController = new PostListController(postList);
    postListController.loadPosts("Venta")
   
})