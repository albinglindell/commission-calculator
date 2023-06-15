import React from 'react'

function FlightList({flight}) {
  return (
    <div className='flightList'>
        <h2>Name: {flight.flightNr}</h2>
        <h3>Commission: {flight.provision}</h3>
    </div>
  )
}

export default FlightList