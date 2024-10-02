<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; 
import BaseHeading1 from '../components/BaseHeading1.vue';
import ButtonBase from '../components/ButtonBase.vue';
import { editMyProfile } from '../services/auth'; 
import { getAuth, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'; 


const loading = ref(false);
const auth = getAuth();
const user = auth.currentUser;
const router = useRouter(); 

const editData = ref({
    displayName: user?.displayName || '',
    bio: '',
    career: '',
    newPassword: '',
    currentPassword: '', // Contraseña actual
});

const error = ref(null); 
const mensajeExito = ref(null);

const handleSubmit = async () => {
    loading.value = true;
    error.value = null; 
    mensajeExito.value = null;

    try {
        // Actualizar el perfil (nombre, bio, carrera)
        await editMyProfile({ 
            displayName: editData.value.displayName, 
            bio: editData.value.bio, 
            career: editData.value.career 
        });

        // Actualizar contraseña si se ingresó una nueva
        if (editData.value.newPassword && editData.value.currentPassword) {
            // Reautenticar al usuario antes de cambiar la contraseña
            const credential = EmailAuthProvider.credential(
                user.email,
                editData.value.currentPassword
            );

            // Reautenticación del usuario
            await reauthenticateWithCredential(user, credential);

            // Actualizar la contraseña
            await updatePassword(user, editData.value.newPassword);
            mensajeExito.value = 'Perfil y contraseña actualizados correctamente.';
        } else {
            mensajeExito.value = 'Perfil actualizado correctamente.';
        }

        // Redirigir a MiPerfil.vue después de guardar los cambios
        router.push('/mi-perfil'); 

    } catch (error) {
        console.error('[EditMiPerfil] Error al editar el perfil: ', error);

        if (error.code === 'auth/wrong-password') {
            error.value = 'La contraseña actual es incorrecta.';
        } else if (error.code === 'auth/invalid-credential') {
            error.value = 'Las credenciales son inválidas. Revisa la contraseña.';
        } else {
            error.value = 'Hubo un error al actualizar el perfil. Verifica los datos.';
        }
    } finally {
        loading.value = false;
    }
};
</script>

<template>
    <div class="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md">
        <BaseHeading1 class="text-center mb-4"> Editar mi perfil </BaseHeading1>

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
                    autocomplete="username"
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

            <!-- Campo para ingresar la nueva contraseña -->
            <div class="mb-4">
                <label for="currentPassword" class="block mb-2 font-medium">Contraseña Actual</label>
                <input
                    type="password"
                    id="currentPassword"
                    placeholder="Ingresa tu contraseña actual"
                    class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                    v-model="editData.currentPassword"
                    autocomplete="current-password"
                />
            </div>
            <div class="mb-4">
                <label for="newPassword" class="block mb-2 font-medium">Nueva Contraseña</label>
                <input
                    type="password"
                    id="newPassword"
                    placeholder="Ingresa una nueva contraseña (opcional)"
                    class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-indigo-500"
                    v-model="editData.newPassword"
                    autocomplete="new-password"
                />
            </div>

            <ButtonBase>Guardar Cambios</ButtonBase>
        </form>

        <!-- Mostrar mensajes de éxito o error -->
        <div v-if="mensajeExito" class="mt-4 text-green-600">
            {{ mensajeExito }}
        </div>
        <div v-if="error" class="mt-4 text-red-600">
            {{ error }}
        </div>
    </div>
</template>
