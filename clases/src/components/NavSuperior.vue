<script setup>
import { onMounted, ref } from 'vue';
import { logout, subscribeToAuthChanges } from '../services/auth'; // Asegúrate de que el nombre sea correcto

const loggedUser = ref({
    id: null,
    email: null,
});

// Suscribirse a los cambios de autenticación
onMounted(() => {
    subscribeToAuthChanges(newUserData => loggedUser.value = newUserData);
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
    <nav class="flex justify-between items-center p-4 bg-slate-200 text-slate-800">
        <router-link to="/" class="text-xl">
            <img src="/img/logo_viaje.png" alt="Logo Viaje" class="h-10 w-auto">
        </router-link>

        <ul class="flex gap-4 items-center">
            <li><router-link class="block py-1 px-2" to="/">Home</router-link></li>
            <template v-if="loggedUser.id !== null">
                <li><router-link class="block py-1 px-2" to="/chat">Chat</router-link></li>
                <li><router-link class="block py-1 px-2" to="/mi-perfil">Mi Perfil</router-link></li>
                <li><router-link class="block py-1 px-2" to="/publicaciones">Publicaciones</router-link></li> <!-- Enlace a publicaciones -->
                <li>
                    <form action="#" @submit.prevent="handleLogout">
                        <button type="submit">{{ loggedUser.email }} (Cerrar Sesión)</button>
                    </form>
                </li>
            </template>
            <template v-else>
                <li><router-link class="block py-1 px-2" to="/registrarse">Crear Cuenta</router-link></li>
                <li><router-link class="block py-1 px-2" to="/iniciar-sesion">Iniciar Sesión</router-link></li>
            </template>
        </ul>
    </nav>
</template>
