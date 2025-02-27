import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCuG_LzVOsp4uoJw4NZ9w0URl-ZlXaSCYY",
    authDomain: "personalisedlearningapp.firebaseapp.com",
    projectId: "personalisedlearningapp",
    storageBucket: "personalisedlearningapp.firebasestorage.app",
    messagingSenderId: "188616773340",
    appId: "1:188616773340:web:cde43ef8b82d7ccda8ee19",
    measurementId: "G-ND0TZWKWBK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
export { db, auth, provider, signInWithPopup, signOut, doc, getDoc, setDoc, updateDoc };


