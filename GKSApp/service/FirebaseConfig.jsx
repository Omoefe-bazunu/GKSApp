import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBYODuToJw1WUazU9Snu938LruhJiDDPhI",
  authDomain: "haven-aa6a7.firebaseapp.com",
  projectId: "haven-aa6a7",
  storageBucket: "haven-aa6a7.firebasestorage.app",
  messagingSenderId: "745049817850",
  appId: "1:745049817850:web:9dfbbb6c87b8638f06bf43",
  measurementId: "G-Q0JPRG7Z77",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firestore and Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
