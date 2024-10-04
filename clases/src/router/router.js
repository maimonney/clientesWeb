import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import LoginUser from '../pages/LoginUser.vue';
import RegistroUser from '../pages/RegistroUser.vue';
import MiPerfil from '../pages/MiPerfil.vue';
import EditMiPerfil from '../pages/EditMiPerfil.vue';
import PostUser from '../pages/PostUser.vue'; 

const routes = [
    { path: '/',                 component: Home },
    { path: '/iniciar-sesion',   component: LoginUser },
    { path: '/registrarse',      component: RegistroUser },
    { path: '/mi-perfil',        component: MiPerfil },
    { path: '/mi-perfil/editar', component: EditMiPerfil },
    { path: '/publicaciones',    component: PostUser }, 
];

const router = createRouter({
    routes,
    history: createWebHashHistory(), 
});

export default router;
