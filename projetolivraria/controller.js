// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCl9z40egurJrQALXGMQDywsdKYWoNIap0",
  authDomain: "mobile2025-f1305.firebaseapp.com",
  projectId: "mobile2025-f1305",
  storageBucket: "mobile2025-f1305.firebasestorage.app",
  messagingSenderId: "773220076296",
  appId: "1:773220076296:web:87c24ff4b274f6f2ecbabd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);