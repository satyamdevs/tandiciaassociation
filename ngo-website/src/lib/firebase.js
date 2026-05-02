import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAbk3oH5-LQ6heaYIFeFW5es7VT3Hmmjw0",
  authDomain: "tandia-association.firebaseapp.com",
  projectId: "tandia-association",
  storageBucket: "tandia-association.firebasestorage.app",
  messagingSenderId: "825821249703",
  appId: "1:825821249703:web:33539ba30c44a09e731b82",
  measurementId: "G-EBX8L5V1M1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;