// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Import Firebase Auth
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIeZxv2hKy4CWz_58AxRvkpsk0iqTbHpU",
  authDomain: "project-9ef9f.firebaseapp.com",
  projectId: "project-9ef9f",
  storageBucket: "project-9ef9f.firebasestorage.app",
  messagingSenderId: "318959446950",
  appId: "1:318959446950:web:a08a1d47e36d6f7c8f7d67"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
