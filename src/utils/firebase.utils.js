// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// Auth service
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs } from 'firebase/firestore';

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

// Initialize googleProvider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth(); // Singleton
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

// Create DB (Singleton instance)
export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db); // batch instance

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    });

    await batch.commit();
    console.log('done');
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    // get snapshot from q object
    const querySnapshot = await getDocs(q);
    // querySnapshot.docs array
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
};

// Method
export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    if (!userAuth) return;

    // Gives document reference
    const userDocRef = doc(db, 'users', userAuth.uid);

    // console.log(userDocRef);

    // Data, object
    const userSnapshop = await getDoc(userDocRef);

    // console.log(userSnapshop);

    // Check if data and reference exist in DB
    // console.log(userSnapshop.exists());


    if (!userSnapshop.exists()) {
        // if user data does not exist
        // create / set the document with the data from userAuth in my collection
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    // if user data exists
    // return userDocRef
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}

// Interface layer functions
export const signOutUser = async () => await signOut(auth);

// Observer listener, returns back what it gets from onAuthStateChanged
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback); // open listener