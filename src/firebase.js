// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAinTyXvVpAbGP4NFyAeU4sbSSDwGzZ3uM",
  authDomain: "react-chat-fda2d.firebaseapp.com",
  projectId: "react-chat-fda2d",
  storageBucket: "react-chat-fda2d.appspot.com",
  messagingSenderId: "458448311805",
  appId: "1:458448311805:web:c5bd6e35ceafbd07ebb594",
  measurementId: "G-ER72VQ2ZWP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);