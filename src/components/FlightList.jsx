import React from 'react'
import { IoMdAirplane } from "react-icons/io";


function FlightList({flight}) {
  return (
    <div className='flightList'>
        <h2 className='flightName'>{flight.flightNr}</h2>
        <span className='planeIcon'><IoMdAirplane /></span>
        <h3 className='provision'>{flight.provision}Kr</h3>
    </div>
  )
}

export default FlightList