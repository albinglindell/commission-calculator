import React, { useContext,useRef, useState } from 'react'
import Header from './Header'
import { FcGoogle } from "react-icons/fc";
import DataContext from '../store/dataContext';
import { Link } from 'react-router-dom';

function Login({auth}) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { signInWithGoogle, signInWithEmailPassword, wrongDetails } = useContext(DataContext);
  let emailRef = useRef()
  let passwordRef = useRef()


  
  const loginWithEmail = (e)=>{
    e.preventDefault()
    signInWithEmailPassword(email, password)
    console.log(email, password)
  }

  const changeInputVal = (value)=>{
    if(value === "email"){
      setEmail(emailRef.current.value)
    }
    if(value === "pass"){
      setPassword(passwordRef.current.value)
    }
  }

  return (
    <div className='LoginContainer'>
        <Header heading={"Login"}/>
      <form onSubmit={loginWithEmail}>
        <label htmlFor="email">Email</label>
        <input ref={emailRef} onChange={()=>changeInputVal("email")} value={email} type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input ref={passwordRef} onChange={()=>changeInputVal("pass")} value={password} type="password" name="password" id="password" />
        {wrongDetails && <p className='error'>Wrong email or password</p>}
        <div className="loginBtnContainer">
        <button className='loginButton emailBtn'>Login</button>
        </div>
      </form>
      <Link to={"/signup"}>
        Don't have an account? Sign up
      </Link>
      <p>Or</p>
        <button onClick={()=>signInWithGoogle(auth)} className='loginButton'><FcGoogle className='google'/>Sign in with Google</button>
    </div>
  )
}

export default Login