import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Backbutton from './Backbutton'

function Add() {
    let currentFlights = localStorage.getItem("flights")
    if(!currentFlights){
        localStorage.setItem("flights", JSON.stringify([]))
    } 
    const navigate = useNavigate()
    let FlightNr = useRef()
    let Crewamount = useRef()
    let Earning = useRef()
    let Percent = useRef()
  



    const addToLocalStorageFunc = (flight, Earning)=>{
        if(!isNaN(Earning)){
            localStorage.setItem("total-provision-earned", Earning)
            navigate("/")
            localStorage.setItem("flights", JSON.stringify(flight))

        }

    }
    const handleInputChange = () => {
        if (FlightNr.current) {
            FlightNr.current.value = FlightNr.current.value.toUpperCase();
        }
      };

    let provisionCalculator = ()=>{
        currentFlights = JSON.parse(localStorage.getItem("flights"))

        const currentMoneyNumber = localStorage.getItem("total-provision-earned")

        let FlightNrVal = FlightNr.current.value
        let CrewamountVal = Crewamount.current.value
        let EarningVal = Earning.current.value
        let PercentVal = Percent.current.value

        let percentage = (PercentVal / 100) * 0.99 + 0.01;
        percentage = Math.floor(percentage * 100)/100



        let totalEarningOnCurrentFlight = EarningVal / CrewamountVal * percentage
        let totalEarningPlusNewEarning = Number(currentMoneyNumber) + Number(totalEarningOnCurrentFlight)


        let currentFlight = 
            {
            "flightNr": FlightNrVal,
            "provision":totalEarningOnCurrentFlight
        }
       if(currentFlights){
        currentFlights.unshift(currentFlight)
            addToLocalStorageFunc(currentFlights, totalEarningPlusNewEarning)
        }else{
            addToLocalStorageFunc(currentFlight, totalEarningPlusNewEarning)
       }
       


        
    }

  return (
    <div className='inputForm'>
        <Backbutton />
        <h1 className='flightInfo'>Add flightinfo below</h1>
        <input onChange={handleInputChange} className='inputField' ref={FlightNr} type="text" placeholder='FlightNr.' />
        <input className='inputField' ref={Crewamount} type="number" placeholder='Crewamount'/>
        <input className='inputField' ref={Earning} type="number" placeholder='Total earning(SEK)'/>
        <input className='inputField' ref={Percent} type="number" placeholder='Percent'/>
        <button className='button' onClick={()=>provisionCalculator()}>Add earnings</button>
    </div>
  )
}

export default Add