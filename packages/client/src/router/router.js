import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Album from '../views/Album.vue';

const routes = [
    { path: '/', name: 'home', component: Home },
    { path: '/album/:id', name: 'album', component: Album },
]

const router  = createRouter({ 
    history: createWebHistory(),
    routes
 });

 export default router;