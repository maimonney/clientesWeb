<script setup>
import { ref } from 'vue';
import ButtonBase from '../components/ButtonBase.vue'
import Baseh2 from '../components/Baseh2.vue';
import { login } from '../services/auth';

const user = ref({
    email: '',
    password: '',
});
const loading = ref(false);

async function handleSubmit() {
    loading.value = true;

    try {
        await login({...user.value});
    } catch (error) {
        console.error("[Login handleSubmit] Error al autenticar: ", error);
        
    }

    loading.value = false;
}
</script>

<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <img class="mx-auto h-10 w-auto" src="/img/logo_viaje.png" alt="Logo de la empresa de viaje de Arcana">
    <Baseh2> Iniciar Sesion </Baseh2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form class="space-y-6" action="#" @submit.prevent="handleSubmit">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900"> Email </label>
        <div class="mt-2">
          <input id="email" 
          name="email" 
          type="email" 
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          v-model="user.email">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" 
          class="block text-sm font-medium leading-6 text-gray-900">Password</label>
        </div>
        <div class="mt-2">
          <input id="password" 
          name="password"
           type="password" 
           v-model="user.password"
           class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <ButtonBase type="submit" >Iniciar Session </ButtonBase>
      </div>
    </form>

    
  </div>
</div>
</template>