import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDt5aETnKws4TyV7K8ZsSLv9OWcEl89n4s",
  authDomain: "book-store-46a35.firebaseapp.com",
  projectId: "book-store-46a35",
  storageBucket: "book-store-46a35.appspot.com",
  messagingSenderId: "636946169517",
  appId: "1:636946169517:web:305d636476413280d9d024",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
