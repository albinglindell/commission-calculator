import React from 'react'
import { IoIosLogOut } from "react-icons/io";
import { signOut, getAuth } from 'firebase/auth';

const handleSignOut = () => {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
};
function Header({heading}) {
  return (
    <header className='header'>
        <h1>{heading}</h1>
        {heading === "Dashboard" ? <IoIosLogOut onClick={handleSignOut} className='logout' /> : ""}
    </header>
  )
}

export default Header