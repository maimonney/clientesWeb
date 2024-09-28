<script setup>
import { ref } from 'vue';
import BaseHeading1 from '../components/BaseHeading1.vue';
import ButtonBase from '../components/ButtonBase.vue';
import { editMyProfile } from '../services/auth'; // Cambié el nombre aquí

const loading = ref(false);
const editData = ref({
    displayName: '',
    bio: '',
    career: '',
});

const handleSubmit = async () => {
    loading.value = true;
    try {
        await editMyProfile({ ...editData.value }); // Cambié el nombre aquí
        // Puedes agregar un mensaje de éxito o redirigir al usuario
    } catch (error) {
        console.error('[EditMiPerfil] Error al editar el perfil: ', error);
        // Maneja el error adecuadamente, tal vez mostrando un mensaje al usuario
    } finally {
        loading.value = false; // Asegúrate de resetear el estado de carga
    }
};
</script>

<template>
    <div class="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <BaseHeading1 class="text-center mb-4">Mi Perfil</BaseHeading1>

        <form @submit.prevent="handleSubmit">
            <div class="mb-4">
                <label for="bio" class="block mb-2 font-medium">Biografía</label>
                <input
                    type="text"
                    id="bio"
                    class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                    v-model="editData.bio"
                />
            </div>
            <div class="mb-4">
                <label for="displayName" class="block mb-2 font-medium">Nombre</label>
                <input
                    type="text"
                    id="displayName"
                    class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                    v-model="editData.displayName"
                />
            </div>
            <div class="mb-4">
                <label for="career" class="block mb-2 font-medium">Carrera</label>
                <input
                    type="text"
                    id="career"
                    class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                    v-model="editData.career"
                />
            </div>
            <ButtonBase :disabled="loading">Ingresar</ButtonBase>
        </form>
    </div>
</template>
