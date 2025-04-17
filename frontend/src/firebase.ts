// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlZZIYo9JhMbb7EK5EhL_-MBwvqUg_zc8",
  authDomain: "solo-7df77.firebaseapp.com",
  projectId: "solo-7df77",
  storageBucket: "solo-7df77.firebasestorage.app",
  messagingSenderId: "317197226040",
  appId: "1:317197226040:web:8d912d21652451066616cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);