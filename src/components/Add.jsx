import React, { useContext, useRef, useState } from 'react'
import Nav from './Nav'
import Header from './Header'
// import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner';
import DataContext from '../store/dataContext';


function Add() {
    const navigate = useNavigate()
    let [flightNr, setFlightNr] = useState("")
    const today = new Date().toISOString().split('T')[0];

    let [date, setDate] = useState(today)
    let [totalSales, setTotalSales] = useState("")
    let [crewAmount, setCrewAmount] = useState("")
    let [percentage, setPercentage] = useState("")
    const { addPlaneToUserCollection, loading } = useContext(DataContext);

    let FlightNr = useRef()
    let Crewamount = useRef()
    let Earning = useRef()
    let Percent = useRef()
    let DateNr = useRef()

                                          

    const handleInputChangeEarnings = (input) => {
        if (input === FlightNr) {
            if(FlightNr.current){
                setFlightNr(FlightNr.current.value.toUpperCase())
            }
        }
        if (input === Earning) {
         setTotalSales(Earning.current.value)
        }
        if (input === DateNr) {
          setDate(DateNr.current.value)
        }
        if(input === Crewamount){
            setCrewAmount( Crewamount.current.value)
        }
        if(input === Percent){
            setPercentage( Percent.current.value)
        }
      };

    let provisionCalculator = ()=>{

        let FlightNrVal = flightNr
        let CrewamountVal = crewAmount
        let EarningVal = totalSales
        let PercentVal = percentage / 100
        let DateVal = date

                


        let totalEarningOnCurrentFlight = Number(EarningVal / CrewamountVal * PercentVal).toFixed(1)

        let currentFlight = 
            {
            "flightNr": FlightNrVal,
            "provision":totalEarningOnCurrentFlight,
            "date": DateVal
        }
  
        addPlaneToUserCollection(currentFlight)
        navigate("/flightHistory")  
    }

  return (
    <div className='inputForm'>
        <Header heading={"Add commission"}/>
    <div className="statisticCard">
        <input  ref={FlightNr} onChange={()=>handleInputChangeEarnings(FlightNr)} type="text" className="flightNr" placeholder='FlightNr' value={flightNr}/>
        <input  ref={Earning} onChange={()=>handleInputChangeEarnings(Earning)} type='number' inputMode="decimal" pattern="[0-9.,]*" className="totalEarnings" placeholder='Total sales' value={totalSales}/>
        <input  ref={Crewamount} onChange={()=>handleInputChangeEarnings(Crewamount)} type='number' inputMode='numeric' pattern="[0-9]*" className="crewAmount" placeholder='Crew amout' value={crewAmount}/>
        <input  ref={Percent} onChange={()=>handleInputChangeEarnings(Percent)} type='number' inputMode='numeric' pattern="[0-9]*" className="percentValue" placeholder='%' value={percentage}/>
        <input  ref={DateNr} onChange={()=>handleInputChangeEarnings(DateNr)} type='date' className="date" value={date}/>
    </div>
     <div className="FormbuttonContainer">
        <button onClick={()=> provisionCalculator()} className="Formbutton">Add flight</button>
    </div>
    <Nav page={"add"}/>
    {loading ? <LoadingSpinner /> : ""}
    </div>
  )
}

export default Add