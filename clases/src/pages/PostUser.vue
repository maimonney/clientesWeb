
<script setup>
import { ref, onMounted } from 'vue';
import { guardarPublicacion, suscribirsePublicaciones } from '../services/postUser'; // Asegúrate de que estas importaciones sean correctas
import { guardarComentario, suscribirseComentarios } from '../services/comentUser';
import { auth } from '../services/firebase'; 

const publicaciones = ref([]);
const nuevaPublicacion = ref({ texto: '' });
const nuevoComentario = ref({}); 

const agregarPublicacion = async () => {
    if (nuevaPublicacion.value.texto.trim()) {
        const userEmail = auth.currentUser.email; // Obtener el email del usuario logueado
        await guardarPublicacion({ email: userEmail, texto: nuevaPublicacion.value.texto });
        nuevaPublicacion.value.texto = ''; // Limpia el campo de texto
    }
};

const agregarComentario = async (publicacionId) => {
    const comentarioTexto = nuevoComentario.value[publicacionId];
    if (comentarioTexto && comentarioTexto.trim()) {
        const userEmail = auth.currentUser.email; // Obtener el email del usuario logueado
        await guardarComentario(publicacionId, {
            email: userEmail,
            texto: comentarioTexto
        });
        nuevoComentario.value[publicacionId] = ''; // Limpia el campo de texto para esa publicación
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

// Función para formatear la fecha
const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString(); 
};
</script>



<template>
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 class="text-2xl font-bold mb-4">Publicaciones</h2>
        
        <form @submit.prevent="agregarPublicacion" class="mb-6">
            <input 
                v-model="nuevaPublicacion.texto" 
                placeholder="Escribe una publicación" 
                class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button 
                type="submit" 
                class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                Publicar
            </button>
        </form>
        
        <div v-for="publicacion in publicaciones" :key="publicacion.id" class="mb-6 p-4 border rounded-lg bg-gray-100">
            <div class="flex justify-between items-center mb-2">
                <strong class="text-lg">{{ publicacion.email }}</strong>
                <span class="text-gray-500 text-sm">{{ formatDate(publicacion.created_at) }}</span>
            </div>
            <p class="mb-4">{{ publicacion.texto }}</p>
            
            <div class="mb-4">
                <h3 class="text-md font-semibold">Comentarios</h3>
                <ul class="mt-2">
                    <li v-for="comentario in publicacion.comentarios" :key="comentario.id" class="text-gray-600">
                        <strong>{{ comentario.email }}</strong>: {{ comentario.texto }}
                    </li>
                </ul>
            </div>
            <form @submit.prevent="agregarComentario(publicacion.id)" class="mt-4">
                <input 
                    v-model="nuevoComentario[publicacion.id]" 
                    placeholder="Escribe un comentario" 
                    class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                    type="submit" 
                    class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
                    Comentar
                </button>
            </form>
        </div>
    </div>
</template>
