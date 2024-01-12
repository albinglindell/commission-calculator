import React from 'react'
import { IoMdAirplane } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";


function FlightList({flight,setCurrentFlights}) {
  let removeItem = ()=>{

    let flightsString = localStorage.getItem("flights");
    let totalCommision = localStorage.getItem("total-provision-earned");
    let flightsArray = JSON.parse(flightsString);
    let newCommision = parseInt(totalCommision - flight.provision).toFixed(1)
    const index = flightsArray.findIndex(f => f.flightNr === flight.flightNr);
    
        flightsArray.splice(index, 1); 
    
      flightsString = JSON.stringify(flightsArray);
      if(flightsArray.length !== 0){
        localStorage.setItem("flights", flightsString);
        localStorage.setItem("total-provision-earned", newCommision);
      } else {
        localStorage.clear()
      }
      setCurrentFlights(flightsArray)
  
  }

  return (
    <div className='flightList'>
        <h2 className='flightName'>{flight.flightNr}</h2>
        <span className='planeIcon'><IoMdAirplane /></span>
        <h3 className='provision'>{flight.provision}Kr</h3>
        {/* <button >Delete</button> */}
        <span className='deleteIcon'>
        <TiDeleteOutline onClick={()=>removeItem(flight)}/>
        </span>
    </div>
  )
}

export default FlightList