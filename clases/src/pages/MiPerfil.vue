<script setup>
import { ref, onMounted } from 'vue';
import BaseHeading1 from '../components/BaseHeading1.vue';
import { getUserProfileById } from '../services/userPerfil';
import { getPublicacionesByUserId } from '../services/postUser'; 
import { getAuth } from 'firebase/auth';
import IconEdit from '../components/icons/IconEdit.vue';
import ToBack from '../components/ToBack.vue';

const loggedUser = ref({
    id: null,
    email: null,
    displayName: null,
    bio: null,
    career: null,
    publicaciones: [], 
});

const auth = getAuth();

onMounted(async () => {
    await loadUserProfile();
});

// Función para cargar el perfil de usuario
const loadUserProfile = async () => {
    const user = auth.currentUser; 

    if (!user) {
        console.error('Usuario no autenticado');
        return;
    }

    const userId = user.uid; 

    try {
        const profile = await getUserProfileById(userId); 
        loggedUser.value = profile; 
        await loadUserPublications(); 
    } catch (error) {
        console.error('[MiPerfil] Error al obtener el perfil del usuario:', error);
    }
};


const loadUserPublications = async () => {
    const user = auth.currentUser; 

    if (!user) {
        console.error('Usuario no autenticado');
        return;
    }

    const userId = user.uid;

    try {
        loggedUser.value.publicaciones = await getPublicacionesByUserId(userId); // Cargar publicaciones
    } catch (error) {
        console.error('[MiPerfil] Error al obtener las publicaciones del usuario:', error);
    }
};


const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString(); 
};
</script>

<template>
   <ToBack />
   <div class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <div class="flex items-center justify-between mb-6">
            <div class="flex items-center">
                <img class="inline-block w-[46px] h-[46px] rounded-full mr-2" 
                     src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
                     alt="Avatar">
                <BaseHeading1 >   Mi Perfil</BaseHeading1>
            </div>
            <RouterLink 
              to="/mi-perfil/editar" 
              class="text-indigo-600 hover:text-indigo-800 font-semibold">
             <IconEdit />
            </RouterLink>
        </div>

        <div class="mb-8 p-4 bg-white shadow-md rounded-lg">
            <p class="text-gray-700 text-base">
                {{ loggedUser.bio || "Aca va la bio" }}
            </p>
        </div>

        <div class="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Información del Perfil</h3>
            </div>
            <div class="border-t border-gray-200">
                <dl class="divide-y divide-gray-200">
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Email</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ loggedUser.email }}
                        </dd>
                    </div>
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Nombre</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ loggedUser.displayName || 'No especificado' }}
                        </dd>
                    </div>
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Carrera</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ loggedUser.career || 'No especificado' }}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>

        <div class="bg-white shadow-md rounded-lg p-6">
            <h2 class="text-xl font-bold mb-4">Mis Publicaciones</h2>
            <div v-if="loggedUser.publicaciones.length === 0" class="text-gray-500">
                No has realizado ninguna publicación.
            </div>
            <div v-for="publicacion in loggedUser.publicaciones" :key="publicacion.id" class="mb-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
                <strong>{{ publicacion.email }}</strong>: {{ publicacion.texto }}
                <p class="text-gray-500 text-sm">{{ formatDate(publicacion.created_at) }}</p>
            </div>
        </div>
    </div>
</template>
