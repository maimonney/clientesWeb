import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";
 



/**
 * @param {{email: string, text: string}} newMessage
 * @return {Promise}
 */

export async function savePublicChatMessage( { email, text } ) {
    const chatRef = collection(db, 'public-chat');
    await addDoc(chatRef, {
        email,
        text,
        created_at: serverTimestamp(),
    });
}

export function subscribeToPublicChatMessages(callback) {
    const chatRef = collection(db, 'public-chat');
    const chatQuery = query(chatRef, orderBy('created_at'));
    onSnapshot(chatQuery, snapshot => {
        const messages = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                email: doc.data().email,
                text: doc.data().text,
            }
        });
        callback(messages);
    });
}