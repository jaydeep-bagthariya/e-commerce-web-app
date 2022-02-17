import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDR1fcJz8UDbDMY9m9v_ENZ9pySRWQHNTw",
  authDomain: "e-commerce-web-app-dc26f.firebaseapp.com",
  projectId: "e-commerce-web-app-dc26f",
  storageBucket: "e-commerce-web-app-dc26f.appspot.com",
  messagingSenderId: "471072483191",
  appId: "1:471072483191:web:1a004917e8dd7eec90a372",
  measurementId: "G-5GC2VZ8P89"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);

export default fireDB;