// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQMKJMoO3Varm4k2HtZjI78b76Q2GgDJk",
  authDomain: "mood-swing-979ba.firebaseapp.com",
  projectId: "mood-swing-979ba",
  storageBucket: "mood-swing-979ba.firebasestorage.app",
  messagingSenderId: "813530911601",
  appId: "1:813530911601:web:2b1b895fdc1ad799659cd0",
  measurementId: "G-JYYTJTRNFG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db, app };
