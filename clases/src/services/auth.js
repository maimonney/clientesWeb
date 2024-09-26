// src/services/auth.js
// src/services/auth.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export async function login({ email, password }) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential; // Retorna el objeto de credenciales
    } catch (error) {
        console.error("[auth.js] Error al tratar de iniciar sesión:", error);
        throw error; // Lanza el error para que pueda ser manejado
    }
}

