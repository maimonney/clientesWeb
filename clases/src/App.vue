<script setup>
import { ref, onMounted } from 'vue';
import NavLateral from './components/NavLateral.vue';
import { subscribeToAuthChanges } from './services/auth'; 
import { useRouter } from 'vue-router';

const loggedUser = ref({
    id: null,
    email: null,
    displayName: null,
});
const router = useRouter();

onMounted(() => {
    subscribeToAuthChanges(newUserData => {
        loggedUser.value = newUserData;

        // Redirecciona si el usuario no está logueado
        if (newUserData.id) {
            router.push('/');
        } 

    });
});
</script>

<template>
  <div class="relative">
    <!-- Menú de navegación para login y registro -->
    <nav v-if="!loggedUser.id" class="flex justify-center items-center backdrop-blur-sm bg-white/70 border border-gray-300 rounded-lg shadow-lg p-4 mx-6 my-4 absolute top-0 left-0 right-0 z-10">
      <div class="space-x-4">
        <router-link to="/iniciar-sesion" class="text-[#166534] hover:underline">Iniciar Sesión</router-link>
        <router-link to="/registrarse" class="text-[#166534] hover:underline">Registrarse</router-link>
      </div>
    </nav>

   
    <div v-if="!loggedUser.id">
      <router-view />
    </div>

    <!-- Si el usuario está logueado, mostramos el nav lateral y el contenido de las rutas -->
    <div v-else>
      <NavLateral :loggedUser="loggedUser" />
      <div class="ml-4 sm:ml-12 md:ml-64 p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>
