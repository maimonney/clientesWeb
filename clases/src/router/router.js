import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import LoginUser from '../pages/LoginUser.vue';
import RegistroUser from '../pages/RegistroUser.vue';
import MiPerfil from '../pages/MiPerfil.vue';
import EditMiPerfil from '../pages/EditMiPerfil.vue';
import PostUser from '../pages/PostUser.vue'; // Asegúrate de importar el componente de publicaciones

const routes = [
    { path: '/',                 component: Home },
    { path: '/iniciar-sesion',   component: LoginUser },
    { path: '/registrarse',      component: RegistroUser },
    { path: '/mi-perfil',        component: MiPerfil },
    { path: '/mi-perfil/editar', component: EditMiPerfil },
    { path: '/publicaciones',    component: PostUser }, // Nueva ruta para el componente de publicaciones
];

const router = createRouter({
    routes,
    history: createWebHashHistory(), // Cambia a createWebHistory si no deseas usar hashes
});

export default router;
