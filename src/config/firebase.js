// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore"; // Import Firestore
// import { doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBadROdjpLmaG8ITQ_5IyM7IxERXZgzFYw",
  authDomain: "trail-22e44.firebaseapp.com",
  projectId: "trail-22e44",
  storageBucket: "trail-22e44.appspot.com",
  messagingSenderId: "1039374222225",
  appId: "1:1039374222225:web:167250c0cf1fa888eb5030"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);









// ********************************************
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBadROdjpLmaG8ITQ_5IyM7IxERXZgzFYw",
//   authDomain: "trail-22e44.firebaseapp.com",
//   projectId: "trail-22e44",
//   storageBucket: "trail-22e44.appspot.com",
//   messagingSenderId: "1039374222225",
//   appId: "1:1039374222225:web:167250c0cf1fa888eb5030"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);