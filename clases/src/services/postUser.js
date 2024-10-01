import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, where, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { getAuth } from "firebase/auth"; // Importa el módulo de autenticación de Firebase

const auth = getAuth(); // Inicializa la autenticación

/**
 * @param {{email: string, texto: string}} nuevaPublicacion
 * @return {Promise}
 */
export const guardarPublicacion = async ({ email, texto }) => {
    const publicacionesRef = collection(db, 'publicaciones');
    await addDoc(publicacionesRef, {
        email,
        texto,
        created_at: serverTimestamp(),
        userId: auth.currentUser.uid, // Guarda el userId del autor de la publicación
    });
};

/**
 * @param {Function} callback
 */
export const suscribirsePublicaciones = (callback) => {
    const publicacionesRef = collection(db, 'publicaciones');
    const publicacionesQuery = query(publicacionesRef, orderBy('created_at'));
    
    return onSnapshot(publicacionesQuery, snapshot => {
        const publicaciones = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        callback(publicaciones);
    });
};

/**
 * @param {string} userId
 * @return {Promise<Array>}
 */
export const getPublicacionesByUserId = async (userId) => {
    const publicacionesRef = collection(db, 'publicaciones');
    const q = query(publicacionesRef, where('userId', '==', userId));

    const querySnapshot = await getDocs(q);
    const publicaciones = [];

    querySnapshot.forEach((doc) => {
        publicaciones.push({ id: doc.id, ...doc.data() });
    });

    return publicaciones;
};
