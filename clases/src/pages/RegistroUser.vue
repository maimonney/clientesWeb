<script setup>
import { ref } from 'vue';
import ButtonBase from '../components/ButtonBase.vue';
import Baseh2 from '../components/Baseh2.vue';
import { registroUser } from '../services/auth'; // Asegúrate de que esto apunte a la función correcta

const user = ref({
    email: '',
    password: '',
});
const loading = ref(false);
const errorMessage = ref(''); // Nueva variable para el mensaje de error

async function handleSubmit() {
    loading.value = true;
    errorMessage.value = ''; // Limpiar el mensaje de error antes de cada intento

    try {
        await registroUser({ ...user.value }); // Asegúrate de que esta función esté correctamente importada
        // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
    } catch (error) {
        console.error("[Register handleSubmit] Error al registrar: ", error); // Mantén el log para depuración
        if (error.code === 'auth/email-already-in-use') {
            errorMessage.value = "El correo electrónico ya está registrado. Por favor, intenta con otro.";
        } else {
            errorMessage.value = "Ocurrió un error al intentar registrar el usuario. Intenta nuevamente.";
        }
    }

    loading.value = false;
}
</script>

<template>
    <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="/img/logo_viaje.png" alt="Logo de la empresa de viaje de Arcana">
            <Baseh2>Registrar Usuario</Baseh2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" action="#" @submit.prevent="handleSubmit">
                
                <!-- Mensaje de error -->
                <div v-if="errorMessage" class="text-red-600 bg-red-100 border border-red-400 rounded-lg p-3">
                    {{ errorMessage }}
                </div>

                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                    <div class="mt-2">
                        <input id="email" 
                               name="email" 
                               type="email" 
                               v-model="user.email" 
                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div>
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    <div class="mt-2">
                        <input id="password" 
                               name="password" 
                               type="password" 
                               v-model="user.password" 
                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    </div>
                </div>

                <div>
                    <ButtonBase type="submit">Registrarse</ButtonBase>
                </div>
            </form>
        </div>
    </div>
</template>
