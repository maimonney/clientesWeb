// src/router/router.js
import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import Perfil from '../pages/PerfilUser.vue'; // Importa el componente de perfil

const routes = [
    { path: '/', component: Home },
    { path: '/iniciar-sesion', component: Login },
    { path: '/registrarse', component: Register },
    { path: '/perfil', component: Perfil }, 
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;

