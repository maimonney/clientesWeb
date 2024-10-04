<script setup>
import { ref, onMounted } from 'vue';
import { logout, subscribeToAuthChanges } from '../services/auth'; 
import IconHome from '../components/icons/IconHome.vue';
import IconPerfil from '../components/icons/IconPerfil.vue';
import IconPublicar from '../components/icons/IconPublicar.vue';
import IconCerrarSesion from '../components/icons/IconCerrarSesion.vue'; 
import IconTravel from './icons/IconTravel.vue';

// Prop para recibir el estado del usuario
const props = defineProps({
    loggedUser: {
        type: Object,
        required: true,
    },
});

// Estado para controlar la visibilidad del menú
const isMenuOpen = ref(false);

// Función para alternar el estado del menú
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
    subscribeToAuthChanges(newUserData => {

    });
});

const handleLogout = async () => {
    try {
        await logout();
        router.push('/iniciar-sesion');
        console.log("Sesión cerrada correctamente");
    } catch (error) {
        console.error("[Navbar handleLogout] Error al cerrar sesión:", error);
    }
}
</script>

<template>
    <nav class="bg-[#115e59] text-white flex flex-col fixed h-screen w-12 md:w-64">
        
        <!-- Logo -->
        <div class="p-4 bg-[#134e4a] flex flex-col md:flex-row justify-between items-center">
            <router-link to="/" class="text-xl">
                <IconTravel />
            </router-link>
            <!-- Botón menú hamburguesa para pantallas pequeñas -->
            <button @click="toggleMenu" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                <span class="sr-only">Abrir menú</span>
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                </svg>
            </button>
        </div>

        <!-- Menú de navegación -->
        <ul :class="{'block': isMenuOpen, 'hidden': !isMenuOpen}" class="bg-[#115e59] md:block flex flex-col p-4 space-y-2 z-50" id="navbar-default">
            <!-- Enlace Home (solo visible si está logueado) -->
            <template v-if="loggedUser.id !== null">
                <li>
                    <router-link class="flex items-center gap-2 py-2 px-4 hover:bg-slate-700 rounded transition-colors" to="/">
                        <IconHome class="h-6 w-6" />
                        <span class="hidden md:inline">Home</span>
                    </router-link>
                </li>
                <!-- Enlace Mi Perfil -->
                <li>
                    <router-link class="flex items-center gap-2 py-2 px-4 hover:bg-slate-700 rounded transition-colors" to="/mi-perfil">
                        <IconPerfil class="h-6 w-6" />
                        <span class="hidden md:inline">Mi perfil</span>
                    </router-link>
                </li>
                <!-- Enlace Publicar -->
                <li>
                    <router-link class="flex items-center gap-2 py-2 px-4 hover:bg-slate-700 rounded transition-colors" to="/publicaciones">
                        <IconPublicar class="h-6 w-6" />
                        <span class="hidden md:inline">Publicar</span>
                    </router-link>
                </li>
            </template>
            <template v-else>
                <!-- Enlace Crear Cuenta -->
                <li>
                    <router-link class="flex items-center gap-2 py-2 px-4 hover:bg-slate-700 rounded transition-colors" to="/registrarse">
                        Crear Cuenta
                    </router-link>
                </li>
                <!-- Enlace Iniciar Sesión -->
                <li>
                    <router-link class="flex items-center gap-2 py-2 px-4 hover:bg-slate-700 rounded transition-colors" to="/iniciar-sesion">
                        Iniciar Sesión
                    </router-link>
                </li>
            </template>
        </ul>

        <!-- Botón Cerrar Sesión al final -->
        <div class="p-4 mt-auto">
            <form action="#" @submit.prevent="handleLogout">
                <button type="submit" class="flex items-center gap-2 py-2 px-4 hover:bg-slate-700 rounded transition-colors w-full text-left">
                    <span class="hidden md:inline">{{ loggedUser.email }}</span>
                    <IconCerrarSesion class="h-6 w-6" />
                </button>
            </form>
        </div>
    </nav>
</template>
