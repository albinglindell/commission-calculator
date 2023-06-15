import React, {useState}from 'react'
import { Link } from 'react-router-dom'
import PopupModul from './PopupModul'

function Homescreen() {
    const totalProvision = localStorage.getItem("total-provision-earned")
    const [display, setDisplay]= useState(false)



  return (
    <div className='homeScreen'>
        <PopupModul display={display} setDisplay={setDisplay} />
        <h2 className='total-provision'>Total commission: {totalProvision ? totalProvision : "0"}kr</h2>
        <div className="homeScreenButtonContainer">
        <Link className='Link' to={"/AddFlight"}>
          <button className='button' >Add flight commission</button>
        </Link>
        <Link className='Link' to={"/FlightHistory"}>
          <button className='button' >Flight history</button>
        </Link>
          <button className='button' onClick={()=>setDisplay(true)}>Delete history</button>
        </div>
    </div>
  )
}

export default Homescreen