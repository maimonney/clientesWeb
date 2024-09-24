<script setup>
import { ref } from 'vue';
import BaseHeading1 from '../components/BaseHeading1.vue';

async function handleSubmit (){
}
const user = ref({
    email: '',
    password: '',
}); 

const loading = ref(false); 




</script>



<template>
    <BaseHeading1>Ingresar a tu Cuenta</BaseHeading1>

    <form action="#" @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="block mb-2" for="email">Email</label>
                    <input type="email" id="email" class="w-full p-2 border rounded" v-model="newMessege.email">
                </div>
                <div class="mb-4">
                    <label class="block mb-2" for="text ">Mensaje</label>
                    <textarea id="text" class="w-full min-h-10 p-2 border rounded" v-model="newMessege.text"></textarea>
                </div>
                <BaseButton class="w-full" color="green">Enviar</BaseButton>
            </form><form action="#" @submit.prevent="handleSubmit">
                <div class="mb-4">
                    <label class="block mb-2" for="email">Email</label>
                    <input type="email" id="email" class="w-full p-2 border rounded" v-model="newMessege.email">
                </div>
                <div class="mb-4">
                    <label class="block mb-2" for="text ">Mensaje</label>
                    <textarea id="text" class="w-full min-h-10 p-2 border rounded" v-model="newMessege.text"></textarea>
                </div>
                <BaseButton class="w-full" color="green">Enviar</BaseButton>
            </form>
</template>