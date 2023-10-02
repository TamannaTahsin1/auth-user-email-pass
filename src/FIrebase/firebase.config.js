// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwO-OaLGyOeQApgaT74ERVN2x9F6zyAFI",
  authDomain: "auth-user-email-pass.firebaseapp.com",
  projectId: "auth-user-email-pass",
  storageBucket: "auth-user-email-pass.appspot.com",
  messagingSenderId: "883586256374",
  appId: "1:883586256374:web:8a967d12f49cc03e370bd7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
