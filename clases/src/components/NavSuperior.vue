<script setup>
import { onMounted, ref } from 'vue';
import { auth } from '../services/firebase.js';
import { onAuthStateChanged, signOut } from 'firebase/auth'; 

const loggerUser = ref({
  id: null,
  email: null,
});

// Detectar cambios en el estado de autenticación
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      loggerUser.value = {
        id: user.uid,
        email: user.email,
      };
    } else {
      loggerUser.value = {
        id: null,
        email: null,
      };
    }
  });
});

// Función para cerrar sesión
const handleSignOut = () => {
  signOut(auth)
    .then(() => {
      loggerUser.value = {
        id: null,
        email: null,
      };
    })
    .catch((error) => {
      console.error('Error al cerrar sesión', error);
    });
};
</script>

<template>
  <nav class="flex justify-between items-center p-4 bg-slate-200 text-slate-800 border border-black rounded-lg">
    <div class="flex items-center">
      <router-link to="/" class="text-xl">
        <img src="/public/img/logo_viaje.png" alt="Logo" class="h-10 w-auto mr-2" /> 
      </router-link>
    </div>
    <ul class="flex gap-4 items-center">
      <li><router-link class="block py-1 px-2" to="/">Inicio</router-link></li>
      <li><router-link class="block py-1 px-2" to="/agregar-publicacion">Agregar Publicación</router-link></li>
      <li><router-link class="block py-1 px-2" to="/perfil">Perfil</router-link></li>
      <template v-if="loggerUser.id !== null">
        <li><router-link class="block py-1 px-2" to="/chat">Chat</router-link></li>
        <li><router-link class="block py-1 px-2" to="/perfil">Mi perfil</router-link></li>
        <li>
          <form action="#">
            <button type="button" @click="handleSignOut">{{ loggerUser.email }} (cerrar sesión)</button>
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
