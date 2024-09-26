<script setup>
import { ref } from 'vue';
import BaseHeading1 from '../components/BaseHeading1.vue';
import ButtonBase from '../components/ButtonBase.vue';
import { login } from '../services/auth.js'; // Importa la función de login
import { useRouter } from 'vue-router'; // Importa el router

const user = ref({
    email: '',
    password: '',
}); 

const loading = ref(false); 
const router = useRouter(); // Instancia del router

async function handleSubmit() {
    loading.value = true; // Activa el estado de carga
    try {
        await login(user.value); // Llama a la función de login
        console.log('Inicio de sesión exitoso:', user.value);
        router.push('/'); // Redirige a la página principal después de iniciar sesión
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        alert('Error al iniciar sesión: ' + error.message); // Muestra un mensaje al usuario
    } finally {
        loading.value = false; // Desactiva el estado de carga
    }
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img class="mx-auto h-10 w-auto" src="/public/img/logo_viaje.png" alt="Your Company">
      <BaseHeading1>Ingresar a tu Cuenta</BaseHeading1>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              v-model="user.email"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              v-model="user.password"
              required
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        
        <ButtonBase>Iniciar Sesión</ButtonBase>
      </form>
    </div>
  </div>
</template>
