import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Chat from '../pages/Chat.vue';
import LoginUser from '../pages/LoginUser.vue';
import RegistroUser from '../pages/RegistroUser.vue';
import MiPerfil from '../pages/MiPerfil.vue';
import EditMiPerfil from '../pages/EditMiPerfil.vue';


const routes = [
    { path: '/',                    component: Home, },
    { path: '/chat',                component: Chat, },
    { path: '/iniciar-sesion',      component: LoginUser, },
    { path: '/registrarse',         component: RegistroUser, },
    { path: '/mi-perfil',            component: MiPerfil,},
    { path: '/mi-perfil/editar',     component: EditMiPerfil,},
];

const router = createRouter({

    routes,
    history: createWebHashHistory(),
   
});

export default router;