import React from 'react'
import { IoMdAirplane } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";


function FlightList({flight, deletePlane}) {
  // const deletePlane = async (planeId) => {
  //   try {
  //     const response = await fetch(`https://us-central1-commission-7410f.cloudfunctions.net/deleteflight?id=${planeId}`, {
  //       method: 'DELETE'
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
      
  //     console.log('Delete response:', await response.text());
  //   } catch (error) {
  //     console.error('Error deleting plane:', error);
  //   }
  // };
  
  // Example usage

  return (
    <div className='flightList'>
        <h2 className='flightName'>{flight.flightNr}</h2>
        <span className='planeIcon'><IoMdAirplane /></span>
        <h3 className='provision'>{flight.provision}Kr</h3>
        {/* <button >Delete</button> */}
        <span className='deleteIcon'>
        <TiDeleteOutline onClick={()=>deletePlane(flight.id)}/>
        </span>
    </div>
  )
}

export default FlightList