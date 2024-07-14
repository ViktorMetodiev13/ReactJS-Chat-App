import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactjs-chat-app-e325b.firebaseapp.com",
  projectId: "reactjs-chat-app-e325b",
  storageBucket: "reactjs-chat-app-e325b.appspot.com",
  messagingSenderId: "533019805039",
  appId: "1:533019805039:web:e803ea447127bfa4a3949a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();