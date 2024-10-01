<!-- Comentarios.vue -->
<script setup>
import { ref } from 'vue';
import { saveComentario, subscribeToComentarios } from '../services/comentUser';

const props = defineProps({
    publicacionId: String,
});

const comentarios = ref([]);
const nuevoComentario = ref('');

onMounted(() => {
    subscribeToComentarios(props.publicacionId, (nuevosComentarios) => {
        comentarios.value = nuevosComentarios;
    });
});

const handleSubmit = async () => {
    if (nuevoComentario.value.trim()) {
        await saveComentario(props.publicacionId, { text: nuevoComentario.value });
        nuevoComentario.value = '';
    }
};
</script>

<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <input v-model="nuevoComentario" placeholder="Escribe tu comentario..." class="p-2 border rounded" />
            <button type="submit">Comentar</button>
        </form>

        <ul>
            <li v-for="comentario in comentarios" :key="comentario.id">
                {{ comentario.text }}
            </li>
        </ul>
    </div>
</template>
