import React, { useContext } from 'react'
import Header from './Header'
import { FcGoogle } from "react-icons/fc";
import DataContext from '../store/dataContext';

function Login({auth}) {
  const { signInWithGoogle } = useContext(DataContext);



  return (
    <div className='LoginContainer'>
        <Header heading={"Login"}/>
        <button onClick={()=>signInWithGoogle(auth)} className='loginButton'><FcGoogle className='google'/>Sign in with Google</button>
    </div>
  )
}

export default Login