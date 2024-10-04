<script setup>
import { onMounted } from 'vue';
import { logout, subscribeToAuthChanges } from '../services/auth'; 
import IconHome from '../components/icons/IconHome.vue';
import IconPerfil from '../components/icons/IconPerfil.vue';
import IconPublicar from '../components/icons/IconPublicar.vue';
import IconCerrarSesion from '../components/icons/IconCerrarSesion.vue'; // Corregir ruta

// Prop para recibir el estado del usuario
const props = defineProps({
    loggedUser: {
        type: Object,
        required: true,
    },
});

onMounted(() => {
    subscribeToAuthChanges(newUserData => {

    });
});

const handleLogout = async () => {
    try {
        await logout();
        console.log("Sesión cerrada correctamente");
    } catch (error) {
        console.error("[Navbar handleLogout] Error al cerrar sesión:", error);
    }
}
</script>

<template>
    <div class="h-screen w-64 bg-slate-800 text-white flex flex-col fixed">
        <!-- Logo -->
        <div class="p-4 bg-slate-900 flex justify-center">
            <router-link to="/" class="text-xl">
                <img src="/img/logo_viaje.png" alt="Logo Viaje" class="h-10 w-auto">
            </router-link>
        </div>

        <!-- Menú de navegación -->
        <ul class="flex-1 p-4 space-y-4">
            <!-- Enlace Home (solo visible si está logueado) -->
            <template v-if="loggedUser.id !== null">
                <li>
                    <router-link class="flex items-center gap-2 py-2 px-4 hover:bg-slate-700 rounded transition-colors" to="/">
                        <IconHome class="h-6 w-6" /> 
                        <span>Home</span>
                    </router-link>
                </li>
                <!-- Enlace Mi Perfil -->
                <li>
                    <router-link class="flex items-center gap-2 py-2 px-4 hover:bg-slate-700 rounded transition-colors" to="/mi-perfil">
                        <IconPerfil class="h-6 w-6" /> 
                        <span>Mi perfil</span>
                    </router-link>
                </li>
                <!-- Enlace Publicar -->
                <li>
                    <router-link class="flex items-center gap-2 py-2 px-4 hover:bg-slate-700 rounded transition-colors" to="/publicaciones">
                        <IconPublicar class="h-6 w-6" /> 
                        <span>Publicar</span>
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
                    <span>{{ loggedUser.email }}</span>
                    <IconCerrarSesion class="h-6 w-6" />
                </button>
            </form>
        </div>
    </div>
</template>
