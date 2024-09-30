import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";;
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAw0L5xNeHd-QRzNtQH0bmnPvdbddnyWSo",
  authDomain: "clientesweb-58e8e.firebaseapp.com",
  projectId: "clientesweb-58e8e",
  storageBucket: "clientesweb-58e8e.appspot.com",
  messagingSenderId: "965649110600",
  appId: "1:965649110600:web:c580dbbe280dd773b2aa7d",
  measurementId: "G-83HBM8PQFK"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);


