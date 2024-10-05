<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import BaseHeading1 from '../components/BaseHeading1.vue';
import { getAuth } from 'firebase/auth';
import ButtonBase from '../components/ButtonBase.vue';
import { editMyProfile } from '../services/auth'; 
import ToBack from '../components/ToBack.vue';

const loading = ref(false);
const auth = getAuth();
const user = auth.currentUser;
const router = useRouter(); 

const editData = ref({
    displayName: user?.displayName || '',
    bio: user?.bio || '', 
    career: user?.career || '', 
});

const error = ref(null); 
const mensajeExito = ref(null);

const handleSubmit = async () => {
    loading.value = true;
    error.value = null; 
    mensajeExito.value = null;

    try {
        await editMyProfile({ 
            displayName: editData.value.displayName, 
            bio: editData.value.bio, 
            career: editData.value.career 
        });

        mensajeExito.value = 'Perfil actualizado correctamente.';
        router.push('/mi-perfil'); 

    } catch (error) {
        console.error('[EditMiPerfil] Error al editar el perfil: ', error);
        error.value = 'Hubo un error al actualizar el perfil. Verifica los datos.';
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <ToBack />
        <BaseHeading1 class="text-center mb-4"> Editar mi perfil </BaseHeading1>

        <form @submit.prevent="handleSubmit">
            <div class="mb-4">
                <label for="bio" class="block mb-2 font-medium">Biografía</label>
                <input
                    type="text"
                    id="bio"
                    class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#047857]"
                    v-model="editData.bio"
                />
            </div>
            <div class="mb-4">
                <label for="displayName" class="block mb-2 font-medium">Nombre</label>
                <input
                    type="text"
                    id="displayName"
                    class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#047857]"
                    v-model="editData.displayName"
                    autocomplete="username"
                />
            </div>
            <div class="mb-4">
                <label for="career" class="block mb-2 font-medium">Carrera</label>
                <input
                    type="text"
                    id="career"
                    class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#047857]"
                    v-model="editData.career"
                />
            </div>

            <ButtonBase>Guardar Cambios</ButtonBase>
        </form>

        <div v-if="mensajeExito" class="mt-4 text-green-600">
            {{ mensajeExito }}
        </div>
        <div v-if="error" class="mt-4 text-red-600">
            {{ error }}
        </div>
    </div>
</template>
