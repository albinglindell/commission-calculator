import React from 'react'

function FlightList({flight}) {
  return (
    <div className='flightList'>
        <h2 className='flightName'>FlightNr: {flight.flightNr}</h2>
        <h3 className='provision'>Commission: {flight.provision}</h3>
    </div>
  )
}

export default FlightList