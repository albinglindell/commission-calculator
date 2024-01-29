import React, { useContext, useRef, useState } from 'react'
import Header from './Header'
import DataContext from '../store/dataContext';

function Signup() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const { registerWithEmailPassword } = useContext(DataContext);

    let emailRef = useRef()
    let nameRef = useRef()
    let passwordRef = useRef()
  


      
    const registerEmail = (e)=>{
      e.preventDefault()
      registerWithEmailPassword( email, password, name) 
    }
  
    const changeInputVal = (value)=>{
      if(value === "name"){
        setName(nameRef.current.value)
        }
      if(value === "email"){
        setEmail(emailRef.current.value)
      }
      if(value === "pass"){
        setPassword(passwordRef.current.value)
      }
      
    }

  return (


    <div className='LoginContainer'>
    <Header heading={"Sign up"}/>
  <form onSubmit={registerEmail}>
    <label htmlFor="name">Name</label>
    <input ref={nameRef} onChange={()=>changeInputVal("name")} value={name} type="name" name="name" id="name" />
    <label htmlFor="email">Email</label>
    <input ref={emailRef} onChange={()=>changeInputVal("email")} value={email} type="email" name="email" id="email" />
    <label htmlFor="password">Password</label>
    <input ref={passwordRef} onChange={()=>changeInputVal("pass")} value={password} type="password" name="password" id="password" />
    <div className="loginBtnContainer">
    <button className='loginButton emailBtn'>Sign up</button>
    </div>
  </form>
</div>
  )
}

export default Signup