// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAw0L5xNeHd-QRzNtQH0bmnPvdbddnyWSo",
  authDomain: "clientesweb-58e8e.firebaseapp.com",
  projectId: "clientesweb-58e8e",
  storageBucket: "clientesweb-58e8e.appspot.com",
  messagingSenderId: "965649110600",
  appId: "1:965649110600:web:c580dbbe280dd773b2aa7d",
  measurementId: "G-83HBM8PQFK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app); // Inicializa el almacenamiento

export { auth, storage };