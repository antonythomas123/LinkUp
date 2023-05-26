import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjEeo1coNbA0nwFBheXCECNSORTDrFov0",
  authDomain: "linkup-b0850.firebaseapp.com",
  projectId: "linkup-b0850",
  storageBucket: "linkup-b0850.appspot.com",
  messagingSenderId: "1042096961853",
  appId: "1:1042096961853:web:b8477f0e51c86fb704ad54",
  measurementId: "G-5M4VCMQD6P",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
