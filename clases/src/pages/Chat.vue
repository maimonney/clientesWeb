<script setup>
import BaseHeading1 from '../components/BaseHeading1.vue';
import BaseButton from '../components/BaseButton.vue';
import { ref, onMounted } from 'vue';
import {savePublicChatMessage , subscribeToPublicChatMessage} from '..services/public-chat'


const messages = ref ([]);

const newMessege = ref({
    email: '',
    text: '',
});

//Cuando se carga el componente, se leen los mensajes
onMounted(async () => {
    subscribeToPublicChatMessage(newMessege => messages.value = newMessege)
});

function handleSubmit (){
savePublicChatMessage({
    ...newMessege.value,
})

    newMessege.value.text= '';

}
</script>

<template>
    <BaseHeading1>Chat Público</BaseHeading1>

    <div class="flex gap-4">
        <section class="w-3/4">
            <h2 class="sr-only"> Mensaje </h2>

            <div class="min-h-32 p-4 border rounded">
                <ul class="flex flex-col gap-2 item-start ">
                    <li v-for="message in messages"
                    class="p-4 rounded bg-gray-200">
                        <div><b>{{ message.email }} </b> dijo:</div>
                        <div>{{ message.text }}</div>
                    </li>
                </ul>

                <!--Aca van a ir los mensajes de chat-->
            </div>
        </section>
        <section class="w-1/4">
            <h2 class="mb-4">Enviar un mensaje</h2>
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
            </form>
        </section>
    </div>
</template>