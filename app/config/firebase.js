// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDjq3aRrpvnK4Otu-6BjQTUBkmSliE_nWg",
  authDomain: "dairyfarm-a6db5.firebaseapp.com",
  projectId: "dairyfarm-a6db5",
  storageBucket: "dairyfarm-a6db5.appspot.com",
  messagingSenderId: "963420759992",
  appId: "1:963420759992:web:81ee96fa1ce4c52f2e914d",
  measurementId: "G-XYF5KZ272Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);