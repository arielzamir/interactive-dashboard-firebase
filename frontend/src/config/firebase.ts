import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDUY8DriB1VzVT7wyJb5gMliBjhBB0L4No",
  authDomain: "fir-project-d9b5e.firebaseapp.com",
  projectId: "fir-project-d9b5e",
  storageBucket: "fir-project-d9b5e.firebasestorage.app",
  messagingSenderId: "351495299582",
  appId: "1:351495299582:web:856281faa05fda106920af",
  measurementId: "G-TT3WNPEK01",
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore();
