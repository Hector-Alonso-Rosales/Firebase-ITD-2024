// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOl8_mg-XMjeOZXOft-zsBCpi7R5eSxto",
  authDomain: "carritoej2024.firebaseapp.com",
  projectId: "carritoej2024",
  storageBucket: "carritoej2024.appspot.com",
  messagingSenderId: "163367693847",
  appId: "1:163367693847:web:d768408dd4361722c03652"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);