// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyAw0L5xNeHd-QRzNtQH0bmnPvdbddnyWSo",
  authDomain: "clientesweb-58e8e.firebaseapp.com",
  projectId: "clientesweb-58e8e",
  storageBucket: "clientesweb-58e8e.appspot.com",
  messagingSenderId: "965649110600",
  appId: "1:965649110600:web:c580dbbe280dd773b2aa7d",
  measurementId: "G-83HBM8PQFK"
};

// Verifica si hay aplicaciones inicializadas
let app;
if (!getApps().length) {
    app = initializeApp(firebaseConfig); // Inicializa Firebase solo si no hay aplicaciones
} else {
    app = getApps()[0]; // Obtén la aplicación ya inicializada
}

// Inicia la conexión con Firestore, y exporta la referencia a la base
export const db = getFirestore(app);
export const auth = getAuth(app);