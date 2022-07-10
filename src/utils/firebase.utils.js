// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Auth service
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration
// Config allows us to make FB CRUD actions to our own instance of FB
const firebaseConfig = {
    apiKey: "AIzaSyBN3v4WEd2ORwllvO2U0fKOM-fBIfyetoM",
    authDomain: "crwn-clothing-db-11041.firebaseapp.com",
    projectId: "crwn-clothing-db-11041",
    storageBucket: "crwn-clothing-db-11041.appspot.com",
    messagingSenderId: "48673907031",
    appId: "1:48673907031:web:ea686db67f13c5830ede12"
};

// Initialize Firebase app instance
const firebaseApp = initializeApp(firebaseConfig);

// Initialize provider
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);