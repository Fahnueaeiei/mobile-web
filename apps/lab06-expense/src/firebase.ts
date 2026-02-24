// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFQRwiNiAqZ8T4COmNxvGBlTfTgnAEu04",
  authDomain: "mobile-web-7e1e0.firebaseapp.com",
  projectId: "mobile-web-7e1e0",
  storageBucket: "mobile-web-7e1e0.firebasestorage.app",
  messagingSenderId: "836106664621",
  appId: "1:836106664621:web:a5ce9e2477e16c20496424"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);