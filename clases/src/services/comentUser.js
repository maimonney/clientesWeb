import { addDoc, collection, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * @param {string} publicacionId
 * @param {{email: string, texto: string}} nuevoComentario
 * @return {Promise}
 */
export async function guardarComentario(publicacionId, { email, texto }) {
    const comentariosRef = collection(db, 'publicaciones', publicacionId, 'comentarios');
    await addDoc(comentariosRef, {
        email,
        texto,
        created_at: serverTimestamp(),
    });
}

/**
 * @param {string} publicacionId
 * @param {Function} callback
 */
export function suscribirseComentarios(publicacionId, callback) {
    const comentariosRef = collection(db, 'publicaciones', publicacionId, 'comentarios');
    onSnapshot(comentariosRef, snapshot => {
        const comentarios = snapshot.docs.map(doc => ({
            id: doc.id,
            email: doc.data().email,
            texto: doc.data().texto,
            created_at: doc.data().created_at,
        }));
        callback(comentarios);
    });
}
