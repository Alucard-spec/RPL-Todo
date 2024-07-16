import { initializeApp } from "firebase/app";
import {getAuth,signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const provider = new GoogleAuthProvider();


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

// sign in with google functionality
export function googleSignIn(){signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
};
 