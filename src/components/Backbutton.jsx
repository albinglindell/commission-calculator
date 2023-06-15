import React from 'react'
import { Link } from 'react-router-dom'

function Backbutton() {
  return (
    <Link className="Backbtn" to={"/"}>
    <button className='Backbutton'>Go back</button>
    </Link>
  )
}

export default Backbutton