
import {db} from './firebase';
import {collection, addDoc, getDocs, onSnapshot, serverTimestamp, query, orderBy} from 'firebase/firestore';

/** 
*@param {{email: String , text: String}} newMessage
*@return {Promise}
**/
export async function savePublicChatMessage({email, text}){
    const chatRef = collection(db, 'public-chat');

await  addDoc(chatRef, {

        email, text,
        created_at: serverTimestamp(), 

    })
}

export function subscribeToPublicChatMessage(callback){
        //leer los docs
        const chatRef = collection(db, 'public-chat');
        const chatQuery = query(chatRef, orderBy('created_at' ));
    
        //lectura en tiempo real
        onSnapshot(chatQuery, snapshot =>{
            const message  = snapshot.docs.map(doc => {
                return{
                    id: doc.id,
                    email: doc.data().email,
                    text: doc.data().text,
                }
            }); 
            callback(message); 
        })
    };
    
