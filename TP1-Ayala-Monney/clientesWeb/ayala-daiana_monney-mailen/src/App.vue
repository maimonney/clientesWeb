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


        if (!newUserData.id) {
            router.push('/iniciar-sesion'); 
        } else {
            router.push('/'); 
        }
    });
});
</script>

<template>
  <div class="relative">
    <nav v-if="!loggedUser.id" class="flex justify-center items-center backdrop-blur-sm bg-white/70 border border-gray-300 rounded-lg shadow-lg p-4 mx-6 my-4 absolute top-0 left-0 right-0 z-10">
      <div class="space-x-4">
        <router-link to="/iniciar-sesion" class="text-[#166534] hover:underline">Iniciar Sesión</router-link>
        <router-link to="/registrarse" class="text-[#166534] hover:underline">Registrarse</router-link>
      </div>
    </nav>

    <div v-if="!loggedUser.id">
      <router-view />
    </div>

    <div v-else>
      <NavLateral :loggedUser="loggedUser" />
      <div class="ml-8 sm:ml-12 md:ml-64 p-4">
        <router-view />
      </div>
    </div>
  </div>
</template>
