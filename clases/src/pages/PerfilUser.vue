<script setup>
import { ref, onMounted } from 'vue';
import { auth, storage } from '../services/firebase';
import { getDownloadURL, ref as storageRef, uploadBytes } from 'firebase/storage';

const user = ref({
    email: '',
    displayName: '',
    photoURL: ''
});

onMounted(() => {
    if (auth.currentUser) {
        user.value.email = auth.currentUser.email;
        user.value.displayName = auth.currentUser.displayName || '';
        user.value.photoURL = auth.currentUser.photoURL || '';
    }
});

// Función para cargar la imagen de perfil
const uploadProfilePicture = async (event) => {
    const file = event.target.files[0];
    if (file) {
        const storagePath = `profile_pictures/${auth.currentUser.uid}/${file.name}`;
        const storageRefPath = storageRef(storage, storagePath);

        try {
            // Sube el archivo
            await uploadBytes(storageRefPath, file);
            // Obtén la URL de la imagen
            const photoURL = await getDownloadURL(storageRefPath);
            user.value.photoURL = photoURL; // Actualiza la URL de la foto de perfil
        } catch (error) {
            console.error('Error al subir la imagen:', error);
            alert('Error al subir la imagen: ' + error.message);
        }
    }
};
</script>

<template>
  <div>
    <h1>Perfil de Usuario</h1>
    <img v-if="user.photoURL" :src="user.photoURL" alt="Foto de perfil" />
    <input type="file" accept="image/*" @change="uploadProfilePicture" />
  </div>
</template>
