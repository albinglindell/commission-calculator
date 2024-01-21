import React from 'react'
import Header from './Header'
import { FcGoogle } from "react-icons/fc";
import {  GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';

function Login({auth}) {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
      
        signInWithPopup(auth, provider)
          .then((result) => {
            // handle the result
          })
          .catch((error) => {
            // handle errors
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