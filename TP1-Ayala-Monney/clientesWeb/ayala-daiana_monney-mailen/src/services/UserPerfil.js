import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase"; 

export async function updateUserProfile(id, { displayName, bio, career }) {
    const userRef = doc(db, 'users', id);
    try {
        await updateDoc(userRef, {
            displayName,
            bio,
            career,
        });
    } catch (error) {
        console.error("[userPerfil.js updateUserProfile] Error al actualizar el perfil del usuario:", error);
        throw error;
    }
}

export async function getUserProfileById(id) {
    const userRef = doc(db, 'users', id);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
        return userSnapshot.data(); 
    } else {
        console.error("[userPerfil.js getUserProfileById] No existe el perfil del usuario");
        throw new Error("Perfil no encontrado");
    }
}
