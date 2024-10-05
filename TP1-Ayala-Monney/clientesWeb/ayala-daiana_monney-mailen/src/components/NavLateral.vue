<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { logout, subscribeToAuthChanges } from '../services/auth';
import IconHome from '../components/icons/IconHome.vue';
import IconPerfil from '../components/icons/IconPerfil.vue';
import IconPublicar from '../components/icons/IconPublicar.vue';
import IconCerrarSesion from '../components/icons/IconCerrarSesion.vue';
import IconTravel from './icons/IconTravel.vue';

const router = useRouter();

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
        router.push('/iniciar-sesion');
        console.log("Sesión cerrada correctamente");
    } catch (error) {
        console.error("[Navbar handleLogout] Error al cerrar sesión:", error);
    }
}
</script>
<template>
    <nav class="bg-[#115e59] text-white flex flex-col fixed h-screen w-20 md:w-64">

        <div class="p-4 bg-[#134e4a] flex flex-col items-center justify-between">
            <router-link to="/" class="text-2xl">
                <IconTravel />
            </router-link>

        </div>

        <!-- Menú de navegación -->
        <ul class="flex flex-col p-4 space-y-2 md:block">
                <li>
                    <router-link class="flex items-center gap-2 py-2 px-4 hover:bg-slate-700 rounded transition-colors"
                        to="/">
                        <IconHome class="h-6 w-6" />
                        <span class="hidden md:inline">Home</span> 
                    </router-link>
                </li>

                <!-- Mi Perfil -->
                <li>
                    <router-link class="flex items-center gap-2 py-2 px-4 hover:bg-slate-700 rounded transition-colors"
                        to="/mi-perfil">
                        <IconPerfil class="h-6 w-6" />
                        <span class="hidden md:inline">Mi perfil</span> 
                    </router-link>
                </li>
                <!-- Publicar -->
                <li>
                    <router-link class="flex items-center gap-2 py-2 px-4 hover:bg-slate-700 rounded transition-colors"
                        to="/publicaciones">
                        <IconPublicar class="h-6 w-6" />
                        <span class="hidden md:inline">Publicar</span> 
                    </router-link>
                </li>
        </ul>

        <!-- Cerrar Sesión -->
        <div class="p-4 mt-auto">
            <form action="#" @submit.prevent="handleLogout">
                <button type="submit"
                    class="flex items-center gap-2 py-2 px-4 hover:bg-slate-700 rounded transition-colors w-full text-left">
                    <IconCerrarSesion class="h-6 w-6" />
                    <span class="hidden md:inline">{{ loggedUser.displayName }}</span>
                </button>
            </form>
        </div>
    </nav>
</template>
