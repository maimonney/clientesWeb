// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCzm2vfB2G_ahXL2bY9rUJpyDcV0XLHBeE",
    authDomain: "cwm-2024-2-m-p-8099f.firebaseapp.com",
    projectId: "cwm-2024-2-m-p-8099f",
    storageBucket: "cwm-2024-2-m-p-8099f.appspot.com",
    messagingSenderId: "310705465520",
    appId: "1:310705465520:web:b6fe9b4b8743cae2a17375"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Inicia la conexion y exporta la referencia a la base
export const db = getFirestore(app);
export const auth = getAuth();