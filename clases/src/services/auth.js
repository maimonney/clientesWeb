import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, updateProfile, signOut } from "firebase/auth"; // Agregado createUserWithEmailAndPassword
import { auth } from "./firebase"; 

let loggedUser = {
    id: null,
    email: null,
    displayName: null,
};

let observers = [];
onAuthStateChanged(auth, user => {
    if (user) {
        loggedUser = {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
        };
    } else {
        loggedUser = {
            id: null,
            email: null,
            displayName: null,
        };
    }
    notifyAll();
});

export async function login({ email, password }) {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log("Sesión iniciada con éxito: ", user);
    } catch (error) {
        console.error("[auth.js login] Error al tratar de iniciar sesión: ", error);
        throw error;
    }
}

/**
 * @param {{displayName: string, bio: string, career: string}} data
 * @returns {Promise<null>}
 */
export async function editMyProfile({ displayName, bio, career }) {
    try {
        await updateProfile(auth.currentUser, { displayName });
        loggedUser = {
            ...loggedUser,
            displayName,
        };
        notifyAll();
    } catch (error) {
        console.error('[auth.js editMyProfile] Error al tratar de editar el perfil', error);
        throw error;
    }
}

export async function logout() {
    await signOut(auth);
}

/**
 * @param {function} callback
 */
export function subscribeToAuthChanges(callback) {
    observers.push(callback);
    notify(callback);
}

/**
 * @param {function} callback
 */
function notify(callback) {
    callback({ ...loggedUser });
}

function notifyAll() {
    observers.forEach(callback => notify(callback));
}

/**
 * Función para registrar un nuevo usuario.
 * @param {{email: string, password: string}} userData
 * @returns {Promise<firebase.User>}
 */
export async function registroUser({ email, password }) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Usuario registrado con éxito: ", userCredential.user);
        return userCredential.user; // Devuelve el usuario registrado (opcional)
    } catch (error) {
        console.error("[auth.js registro] Error al registrar el usuario: ", error);
        throw error;
    }
}
