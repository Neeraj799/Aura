import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "aura-d4ca0.firebaseapp.com",
    projectId: "aura-d4ca0",
    storageBucket: "aura-d4ca0.firebasestorage.app",
    messagingSenderId: "424790117111",
    appId: "1:424790117111:web:c91df103831d324455e1f2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()