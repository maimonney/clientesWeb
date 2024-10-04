<script setup>
import { ref, onMounted } from 'vue';
import { guardarPublicacion, suscribirsePublicaciones } from '../services/postUser'; 
import { guardarComentario, suscribirseComentarios } from '../services/comentUser';
import { auth } from '../services/firebase'; 
import ToBack from '../components/ToBack.vue';
import Baseh2 from '../components/Baseh2.vue';

const publicaciones = ref([]);
const nuevaPublicacion = ref({ texto: '' });
const nuevoComentario = ref({}); 

const agregarPublicacion = async () => {
    if (nuevaPublicacion.value.texto.trim()) {
        const userEmail = auth.currentUser.email; 
        await guardarPublicacion({ email: userEmail, texto: nuevaPublicacion.value.texto });
        nuevaPublicacion.value.texto = ''; 
    }
};


const agregarComentario = async (publicacionId) => {
    const comentarioTexto = nuevoComentario.value[publicacionId];
    if (comentarioTexto && comentarioTexto.trim()) {
        const userEmail = auth.currentUser.email; 
        await guardarComentario(publicacionId, {
            email: userEmail,
            texto: comentarioTexto
        });
        nuevoComentario.value[publicacionId] = ''; 
    }
};

onMounted(() => {
    suscribirsePublicaciones((data) => {
        publicaciones.value = data;
        publicaciones.value.forEach(publicacion => {
            suscribirseComentarios(publicacion.id, (comentarios) => {
                publicacion.comentarios = comentarios; 
            });
        });
    });
});

const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString(); 
};
</script>

<template>
    <ToBack />
    <div class="max-w-3xl mx-auto p-6 bg-gray-50 shadow-lg rounded-lg space-y-6">
        <Baseh2 class="text-center text-2xl font-bold text-indigo-700">Publicaciones</Baseh2>

        <form @submit.prevent="agregarPublicacion" class="flex flex-col space-y-4">
            <input 
                v-model="nuevaPublicacion.texto" 
                placeholder="¿Qué quieres compartir hoy?" 
                class="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button 
                type="submit" 
                class="self-end px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200 shadow">
                Publicar
            </button>
        </form>
        
        <div v-for="publicacion in publicaciones" :key="publicacion.id" class="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
            <div class="flex justify-between items-center mb-4">
                <strong class="text-indigo-600 text-lg">{{ publicacion.email }}</strong>
                <span class="text-gray-500 text-sm">{{ formatDate(publicacion.created_at) }}</span>
            </div>
            <p class="text-gray-700 mb-4">{{ publicacion.texto }}</p>

            <div class="mb-4">
                <h3 class="text-lg font-semibold text-gray-800">Comentarios</h3>
                <ul class="mt-2 space-y-2">
                    <li v-for="comentario in publicacion.comentarios" :key="comentario.id" class="p-2 bg-gray-50 rounded-lg shadow-sm">
                        <strong class="text-indigo-500">{{ comentario.email }}</strong>: {{ comentario.texto }}
                    </li>
                </ul>
            </div>
            
            <form @submit.prevent="agregarComentario(publicacion.id)" class="mt-4 flex flex-col space-y-4">
                <input 
                    v-model="nuevoComentario[publicacion.id]" 
                    placeholder="Escribe un comentario" 
                    class="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button 
                    type="submit" 
                    class="self-end px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200 shadow">
                    Comentar
                </button>
            </form>
        </div>
    </div>
</template>
