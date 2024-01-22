import React, { useContext } from 'react'
import { IoMdAirplane } from "react-icons/io";
import { TiDeleteOutline } from "react-icons/ti";
import DataContext from '../store/dataContext';


function FlightList({flight}) {
  const { deletePlane,  } = useContext(DataContext);


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