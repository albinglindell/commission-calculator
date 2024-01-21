import React, { useRef, useState } from 'react'
import Nav from './Nav'
import Header from './Header'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'
import LoadingSpinner from './LoadingSpinner';


function Add() {
    const navigate = useNavigate()
    let [flightNr, setFlightNr] = useState("")
    let [totalSales, setTotalSales] = useState("")
    let [crewAmount, setCrewAmount] = useState("")
    let [percentage, setPercentage] = useState("")
    const [loading, setLoading] = useState(false);


        let currentFlights = localStorage.getItem("flights")
    if(!currentFlights){
        localStorage.setItem("flights", JSON.stringify([]))
    } 
    let FlightNr = useRef()
    let Crewamount = useRef()
    let Earning = useRef()
    let Percent = useRef()


    const addPlaneToUserCollection = async (planeData) => {
        
        setLoading(true)
        const auth = getAuth();
        const user = auth.currentUser;
      
        if (user) {
          const token = await user.getIdToken();
          const response = await fetch('https://us-central1-commission-7410f.cloudfunctions.net/addflight', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(planeData)
          });
          // Handle response
          console.log(response)
          setLoading(false)
          navigate("/flightHistory")
        } else {
          // User not logged in
        }
      };
                                            
                                                        

    const handleInputChangeEarnings = (input) => {
        if (input === FlightNr) {
            if(FlightNr.current){
                                setFlightNr(FlightNr.current.value.toUpperCase())

            }
        }
        if (input === Earning) {
                        setTotalSales(Earning.current.value)
        }
        if(input === Crewamount){
            setCrewAmount( Crewamount.current.value)
        }
        if(input === Percent){
            setPercentage( Percent.current.value)
        }
      };

    let provisionCalculator = ()=>{
        currentFlights = JSON.parse(localStorage.getItem("flights"))

        let FlightNrVal = flightNr
        let CrewamountVal = crewAmount
        let EarningVal = totalSales
        let PercentVal = percentage / 100

                


        let totalEarningOnCurrentFlight = Number(EarningVal / CrewamountVal * PercentVal).toFixed(1)

        let currentFlight = 
            {
            "flightNr": FlightNrVal,
            "provision":totalEarningOnCurrentFlight
        }
       if(currentFlights){
        addPlaneToUserCollection(currentFlight)
        // currentFlights.unshift(currentFlight)
        //     addToLocalStorageFunc(currentFlights, totalEarningPlusNewEarning)
        }else{
            // addToLocalStorageFunc(currentFlight, totalEarningPlusNewEarning)
       }
       
    }

  return (
    <div className='inputForm'>
        <Header heading={"Add commission"}/>
    <div className="statisticCard">
        <input  ref={FlightNr} onChange={()=>handleInputChangeEarnings(FlightNr)} type="text" className="flightNr" placeholder='FlightNr' value={flightNr}/>
        <input  ref={Earning} onChange={()=>handleInputChangeEarnings(Earning)} type='number' inputMode="decimal" pattern="[0-9.,]*" className="totalEarnings" placeholder='Total sales' value={totalSales}/>
        <input  ref={Crewamount} onChange={()=>handleInputChangeEarnings(Crewamount)} type='number' inputMode='numeric' pattern="[0-9]*" className="crewAmount" placeholder='Crew amout' value={crewAmount}/>
        <input  ref={Percent} onChange={()=>handleInputChangeEarnings(Percent)} type='number' inputMode='numeric' pattern="[0-9]*" className="percentValue" placeholder='%' value={percentage}/>
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