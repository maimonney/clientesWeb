import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

export async function login({ email , password}){
    try{
  const user =   await signInWithEmailAndPassword( auth , email , password);  
    } catch (error){
        console.error("[auth.js]  Error al tratar de iniciar sesion: " )
        throw error
    }
    
}