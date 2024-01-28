import React, {useContext, useState}from 'react'
// import { Link } from 'react-router-dom'
import PopupModul from './PopupModul'
import Nav from './Nav'
import Header from './Header'
import DataContext from '../store/dataContext'
import LineChart from './LineChart'

function Homescreen() {
    const [display, setDisplay]= useState(false)
    const { totalProvision } = useContext(DataContext);



  return (
    <div className='homeScreen'>
      <div>
      <Header heading={"Dashboard"}/>
        <h2 className='total-provision'>Total commission: {totalProvision ? totalProvision : "0"}kr</h2>
        <LineChart />
      </div>
        <PopupModul display={display} setDisplay={setDisplay} />
        {/* <div className="homeScreenButtonContainer">
        <Link className='Link' to={"/AddFlight"}>
          <button className='button' >Add flight commission</button>
        </Link>
        <Link className='Link' to={"/FlightHistory"}>
          <button className='button' >Flight history</button>
        </Link>
          <button className='button' onClick={()=>setDisplay(true)}>Delete history</button>
        </div> */}
        <Nav page={"home"}/>
    </div>
  )
}

export default Homescreen