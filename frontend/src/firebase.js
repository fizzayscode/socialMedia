// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "social-media-mern-4d94f.firebaseapp.com",
  projectId: "social-media-mern-4d94f",
  storageBucket: "social-media-mern-4d94f.appspot.com",
  messagingSenderId: "713461750273",
  appId: "1:713461750273:web:fd30101ca99a61d4557e00",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
