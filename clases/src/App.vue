<script setup>
import { ref, onMounted } from 'vue';
import NavSuperior from './components/NavSuperior.vue';
import MiPerfil from './pages/MiPerfil.vue';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const isLoggedIn = ref(false);

// Verifica si el usuario está autenticado al montar el componente
const checkUserStatus = () => {
  isLoggedIn.value = !!auth.currentUser; // true si hay un usuario autenticado
};

onMounted(() => {
  checkUserStatus(); // Llama a la función al montar el componente
});
</script>

<template>
  <NavSuperior />
  <main class="p-4">
    <router-view />
  </main>

  <!-- Muestra el perfil si el usuario está autenticado -->
  <div v-if="isLoggedIn">
    <MiPerfil />
  </div>
  
  <!-- Muestra el footer con el logo si el usuario no está autenticado -->
  <footer v-else class="bg-violet-300 p-4 text-center">
    <img src="/img/logo_viaje.png" alt="Logo Viaje" class="h-24 w-auto mx-auto" /> <!-- Aumentar el tamaño del logo -->
  </footer>
</template>
