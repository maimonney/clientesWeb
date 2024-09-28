<script setup>
import { ref } from 'vue';
import BaseHeading1 from '../components/BaseHeading1.vue';

const loggedUser = ref({
    id: null,
    email:null,
    displayName: null,
    bio: null,
    career: null,
});
</script>

<template>
    <div class="max-w-4xl mx-auto py-8 px-4">
        <!-- Encabezado -->
        <div class="flex items-center justify-between mb-6">
            <BaseHeading1>Mi Perfil</BaseHeading1>
            <RouterLink 
              to="/mi-perfil/editar" 
              class="text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              Editar
            </RouterLink>
        </div>

        <!-- Biografía -->
        <div class="mb-8 p-4 bg-white shadow-md rounded-lg">
            <p class="text-gray-700 text-base">
                {{ loggedUser.bio || "Aca va la bio" }}
            </p>
        </div>

        <!-- Información del perfil -->
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
                <h3 class="text-lg leading-6 font-medium text-gray-900">Información del Perfil</h3>
            </div>
            <div class="border-t border-gray-200">
                <dl class="divide-y divide-gray-200">
                    <!-- Email -->
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Email</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ loggedUser.email }}
                        </dd>
                    </div>
                    <!-- Nombre -->
                    <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Nombre</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ loggedUser.displayName || 'No especificado' }}
                        </dd>
                    </div>
                    <!-- Carrera -->
                    <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">Carrera</dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {{ loggedUser.career || 'No especificado' }}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>
