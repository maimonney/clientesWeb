import { doc, setDoc } from "firebase/firestore"; // Asegúrate de incluir esta línea
import { signInWithEmailAndPassword, updateProfile, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase"; // Asegúrate de importar correctamente tu configuración de Firebase
import { getUserProfileById, updateUserProfile } from "./userPerfil";

let loggedUser = {
    id: null,
    email: null,
    displayName: null,
    bio: null,
    career: null,
    fullyLoaded: false,
};

let observers = [];

// Observa cambios en la autenticación
onAuthStateChanged(auth, async user => {
    if (user) {
        loggedUser = {
            id: user.uid,
            email: user.email,
            displayName: user.displayName || null,
            fullyLoaded: false,
        };

        try {
            const userProfile = await getUserProfileById(user.uid);
            loggedUser = {
                ...loggedUser,
                displayName: userProfile.displayName || null,
                bio: userProfile.bio || null,
                career: userProfile.career || null,
                fullyLoaded: true,
            };
        } catch (error) {
            console.error("[auth.js onAuthStateChanged] Error al obtener el perfil del usuario:", error);
        }
    } else {
        loggedUser = {
            id: null,
            email: null,
            displayName: null,
            bio: null,
            career: null,
            fullyLoaded: false,
        };
    }

    notifyAll();
});

// Iniciar sesión
export async function login({ email, password }) {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log("Sesión iniciada con éxito: ", user);
    } catch (error) {
        console.error("[auth.js login] Error al tratar de iniciar sesión: ", error);
        throw error;
    }
}

// Registrar 
export async function registerUser(email, password, displayName, bio = "", career = "") {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Agregar el usuario a Firestore
        const userRef = doc(db, "users", user.uid); 
        await setDoc(userRef, {
            displayName,
            email,
            bio,
            career,
        });

        console.log("Usuario registrado y perfil creado en Firestore");

        // Cargar el perfil
        const userProfile = await getUserProfileById(user.uid);
        loggedUser = {
            ...loggedUser,
            id: user.uid,
            displayName: userProfile.displayName || null,
            bio: userProfile.bio || null,
            career: userProfile.career || null,
            fullyLoaded: true,
        };

        notifyAll();
    } catch (error) {
        console.error("[auth.js registerUser] Error al registrar usuario:", error);
        throw error;
    }
}

// Editar el perfil
export async function editMyProfile({ displayName, bio, career }) {
    try {
        await updateProfile(auth.currentUser, { displayName });
        await updateUserProfile(loggedUser.id, { displayName, bio, career });

        loggedUser = {
            ...loggedUser,
            displayName,
            bio,
            career,
        };
        notifyAll();
    } catch (error) {
        console.error('[auth.js editMyProfile] Error al tratar de editar el perfil', error);
        throw error;
    }
}

// Cerrar sesión
export async function logout() {
    await signOut(auth);
}

// Función para suscribirse a los cambios en la autenticación
export function subscribeToAuthChanges(callback) {
    observers.push(callback);
    notify(callback);
}

// Función para notificar cambios a un solo observador
function notify(callback) {
    callback({ ...loggedUser });
}

// Función para notificar a todos los observadores
function notifyAll() {
    observers.forEach(callback => notify(callback));
}
