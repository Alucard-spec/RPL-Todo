import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyA3Jf4NynR60pr6zIyZFEBD8uEmByOIYMI",
  authDomain: "sample-571e8.firebaseapp.com",
  projectId: "sample-571e8",
  storageBucket: "sample-571e8.appspot.com",
  messagingSenderId: "1079113932321",
  appId: "1:1079113932321:web:a939734ed5d94996df4d60"
};


const app = initializeApp(firebaseConfig);

export const db= getFirestore(app);

export const auth = getAuth(app);
