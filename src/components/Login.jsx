import React from 'react'
import Header from './Header'
import { FcGoogle } from "react-icons/fc";
import {  GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';

function Login({auth}) {
    
const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
  
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // Get user info from the sign-in result
        const user = result.user;

        // Get Firestore instance
        const db = getFirestore();
  
        // Reference to the user's document in Firestore
        const userRef = doc(db, 'users', user.uid);
  
        // Check if user already exists in Firestore
        const docSnap = await getDoc(userRef);
  
        if (!docSnap.exists()) {
          // If user does not exist, add them to Firestore
          await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            profilePic: user.photoURL
            // ... any other user info you want to store
          });
        }
  
        // Additional logic after user sign-in or creation in Firestore
        // ...
      })
      .catch((error) => {
        console.error("Error during sign in with Google", error);
        // Handle sign-in errors
      });
  };

  return (
    <div className='LoginContainer'>
        <Header heading={"Login"}/>
        <button onClick={signInWithGoogle} className='loginButton'><FcGoogle className='google'/>Sign in with Google</button>
    </div>
  )
}

export default Login