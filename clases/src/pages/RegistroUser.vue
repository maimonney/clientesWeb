<script setup>
import { ref } from 'vue';
import ButtonBase from '../components/ButtonBase.vue';
import Baseh2 from '../components/Baseh2.vue';
import IconTravel from '../components/icons/IconTravel.vue';


const user = ref({
    email: '',
    password: '',
});
const loading = ref(false);
const errorMessage = ref(''); 

async function handleSubmit() {
    loading.value = true;
    errorMessage.value = ''; 

    try {
        await registroUser({ ...user.value }); 
    } catch (error) {
        console.error("[Register handleSubmit] Error al registrar: ", error); 
        if (error.code === 'auth/email-already-in-use') {
            errorMessage.value = "El correo electrónico ya está registrado. Por favor, intenta con otro.";
        } else {
            errorMessage.value = "Ocurrió un error al intentar registrar el usuario. Intenta nuevamente.";
        }
    }

    loading.value = false;
}

const iconColor = ref('#115e59');
</script>

<template>
    <!-- Contenedor principal con la imagen de fondo -->
    <div class="flex h-screen justify-center items-center px-6 py-12 lg:px-8 bg-[url('/img/fondoRegistro.jpg')] bg-cover bg-center">
        
        <div class="backdrop-blur-sm bg-white/70 border border-gray-300 rounded-lg shadow-lg p-6 w-full max-w-sm">
            <div class="text-center mb-6 flex flex-col items-center">
                <IconTravel :fillColor="iconColor" />                
 <Baseh2 class="text-gray-900">Registrar Usuario</Baseh2>
            </div>
            
            <form class="space-y-6" action="#" @submit.prevent="handleSubmit">
                <!-- Mensaje de error -->
                <div v-if="errorMessage" class="text-red-600 bg-red-100 border border-red-400 rounded-lg p-3">
                    {{ errorMessage }}
                </div>

                <!-- Input de Email -->
                <div class="max-w-sm space-y-3">
                    <div class="relative">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            v-model="user.email"
                            class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                            placeholder="Tu@mail.com"
                        />
                        <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none ps-4">
                            <svg class="shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                        </div>
                    </div>
                </div>

                <!-- Input de Contraseña -->
                <div class="relative">
                    <input
                        id="password"
                        name="password"
                        type="password"
                        v-model="user.password"
                        class="peer py-3 px-4 ps-11 block w-full bg-gray-100 border-transparent rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                        placeholder="Enter password"
                    />
                    <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none ps-4">
                        <svg class="shrink-0 w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"></path>
                            <circle cx="16.5" cy="7.5" r=".5"></circle>
                        </svg>
                    </div>
                </div>

                <div>
                    <ButtonBase type="submit">Registrarse</ButtonBase>
                </div>
            </form>
        </div>
    </div>
</template>
