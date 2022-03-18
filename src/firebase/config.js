import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIRE_API,
  authDomain: "prsn-frensta.firebaseapp.com",
  projectId: "prsn-frensta",
  storageBucket: "prsn-frensta.appspot.com",
  messagingSenderId: process.env.REACT_APP_MSG_ID,
  appId: process.env.REACT_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
