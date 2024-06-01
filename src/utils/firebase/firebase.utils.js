import { initializeApp } from 'firebase/app';

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup,
    GoogleAuthProvider,
} from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDXfkS6MTxAhGUOnTGaU-iGrmkRowVoY88",
    authDomain: "crwn-clothing-db-5d9e3.firebaseapp.com",
    projectId: "crwn-clothing-db-5d9e3",
    storageBucket: "crwn-clothing-db-5d9e3.appspot.com",
    messagingSenderId: "804516653059",
    appId: "1:804516653059:web:d680c68ad4f4e3e5a8c636"
  };


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

// every time someone interact with provider, we always force them to select an account
provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

// userAuth: what we get back from google signin
export const createUserDocumentFromAuth = async (userAuth) => {
    // doc(db, collections, identifier(unique id))
    const userDocRef = doc(db, 'users', userAuth.uid);
    
    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());

     // if user data does not exist, set it inside of our database
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (error) {
          console.log('error creating the user', error.message);
        }
    }

    // if user data exists 
    return userDocRef;
}