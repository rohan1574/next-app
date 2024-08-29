// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import other services as needed

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDdhCjCxYLifrVtQ8M2RMQUy7xeyb2c72g",
  authDomain: "next-js-project-306ea.firebaseapp.com",
  projectId: "next-js-project-306ea",
  storageBucket: "next-js-project-306ea.appspot.com",
  messagingSenderId: "154447215017",
  appId: "1:154447215017:web:e289760a558281cb106cb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize and export Firebase Auth
const auth = getAuth(app);

export { auth };
