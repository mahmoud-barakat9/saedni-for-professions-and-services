import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAAotsEgeFTVwpyAYytqus1sdYIf3A_m1k",
  authDomain: "saedni-740cb.firebaseapp.com",
  projectId: "saedni-740cb",
  storageBucket: "saedni-740cb.appspot.com",
  messagingSenderId: "74265709378",
  appId: "1:74265709378:web:02d06eddd29a39f424d6db",
  measurementId: "G-JS25NJE5NJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);

export default fireDB;
