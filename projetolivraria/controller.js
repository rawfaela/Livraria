// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwxyuIILMGwRX-Z13_0sfdWr4E2wQwBjU",
  authDomain: "livraria-b9f72.firebaseapp.com",
  projectId: "livraria-b9f72",
  storageBucket: "livraria-b9f72.firebasestorage.app",
  messagingSenderId: "1007324583265",
  appId: "1:1007324583265:web:61d2f337160dcb933da120"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);