<script setup>
import BaseHeading1 from '../components/BaseHeading1.vue';
import ButtonBase from '../components/ButtonBase.vue';
import { onMounted, ref } from 'vue';
import { savePublicChatMessage, subscribeToPublicChatMessages } from '../services/ChatPublico';

const messages = ref([]);

const newMessage = ref({
    email: '',
    text: '',
});


onMounted(async () => {
    subscribeToPublicChatMessages(newMessages => messages.value = newMessages);
});

function handleSubmit() {
    savePublicChatMessage({
        ...newMessage.value,
    });
    
    newMessage.value.text = '';
}
</script>

<template>
    <BaseHeading1>Chat Público</BaseHeading1>

    <div class="flex gap-4">
        <section class="w-3/4">
            <h2 class="sr-only">Mensajes</h2>

            <div class="min-h-32 p-4 border rounded">
                <ul class="flex flex-col items-start gap-2">
                    <li 
                        v-for="message in messages"
                        class="p-4 rounded bg-gray-200"
                    >
                        <div><b>{{ message.email }}</b> dijo:</div>
                        <div>{{ message.text }}</div>
                    </li>
                </ul>
            </div>
        </section>
        <section class="w-1/4">
            <h2 class="mb-4 text-xl">Enviar un mensaje</h2>
            <form 
                action="#"
                @submit.prevent="handleSubmit"
            >
                <div class="mb-4">
                    <label for="email" class="block mb-2">Email</label>
                    <input
                        type="email"
                        id="email"
                        class="w-full p-2 border rounded"
                        v-model="newMessage.email"
                    >
                </div>
                <div class="mb-4">
                    <label for="text" class="block mb-2">Mensaje</label>
                    <textarea 
                        id="text"
                        class="w-full min-h-10 p-2 border rounded"
                        v-model="newMessage.text"
                    ></textarea>
                </div>
                <ButtonBase
                    class="w-full" 
                >Enviar</ButtonBase>
            </form>
        </section>
    </div>
</template>