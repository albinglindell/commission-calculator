import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import Backbutton from './Backbutton'
// import { FaAngleLeft } from 'react-icons/fa'

function Add() {
    let [flightNr, setFlightNr] = useState("")
    let [totalSales, setTotalSales] = useState("")
    let [crewAmount, setCrewAmount] = useState("")
    let [percentage, setPercentage] = useState("")

    // let [activeState, setActiveState] = useState("")
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


    // const onPressState = (state)=>{

    //     if(state ==="FlightNr"){
    //         setActiveState("FlightNr")
    //     } else if(state === "Total sales") {
    //         setActiveState("Total sales")

    //     }else if(state === "Crew amount") {
    //         setCrewAmount("")
    //         setActiveState("Crew amount")

    //     }else if(state === "Percent") {
    //         setPercent("")
    //         setActiveState("Percent")

    //     }
    //     checkInputVal()

    // }
    // const handeClick = (val) => {
    //     if(activeState === "flightNr"){
    //         setFlightNr(flightNr += val)
    //     }
    //     if(activeState === "Total sales"){
    //         setTotalSales( totalSales += val)
    //     }
    //     if(activeState === "Crew amount"){
    //         setCrewAmount(crewAmount += val)
    //     }
    //     if(activeState === "Percent"){
    //         setPercent(percent += val)
    //     }
    // }

    // const deleteInput = ()=>{
    //     if(activeState === "flightNr"){
    //         setFlightNr(flightNr.slice(0, -1))
    //     }
    //     if(activeState === "Total sales"){
    //         setTotalSales( totalSales.slice(0, -1))
    //     }
    //     if(activeState === "Crew amount"){
    //         setCrewAmount(crewAmount.slice(0, -1))
    //     }
    //     if(activeState === "Percent"){
    //         setPercent(percent.slice(0, -1))
    //     }
    // }

    const handleInputChange = () => {
        if (FlightNr.current) {
            // FlightNr.current.value = FlightNr.current.value.toUpperCase();
            setFlightNr(FlightNr.current.value.toUpperCase())
        }
      };
    const handleInputChangeEarnings = (input) => {
        if (input === FlightNr) {
            if(FlightNr.current){
                // FlightNr.current.value = FlightNr.current.value.toUpperCase();
                setFlightNr(FlightNr.current.value.toUpperCase())

            }
        }
        if (input === Earning) {
            // FlightNr.current.value = FlightNr.current.value.toUpperCase();
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

        const currentMoneyNumber = localStorage.getItem("total-provision-earned")

        let FlightNrVal = flightNr
        // let CrewamountVal = crewAmount
        let EarningVal = totalSales
        // let PercentVal = percent

        // let percentage = (PercentVal / 100) * 0.99 + 0.01;
        // percentage = Math.floor(percentage * 100)/100



        let totalEarningOnCurrentFlight = Number(EarningVal / 4 * 0.06).toFixed(1)
        let totalEarningPlusNewEarning = Number(currentMoneyNumber) + Number(totalEarningOnCurrentFlight)

        console.log(totalEarningOnCurrentFlight)
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
        {/* <Backbutton /> */}
        {/* <h1 className='flightInfo'>Add flightinfo below</h1>
        <input onChange={handleInputChange} className='inputField' ref={FlightNr} type="text" placeholder='FlightNr.' />
        <input className='inputField' ref={Crewamount} type="number" placeholder='Crewamount'/>
        <input className='inputField' ref={Earning} type="number" placeholder='Total earning(SEK)'/>
        <input className='inputField' ref={Percent} type="number" placeholder='Percent'/>
        <button className='button' onClick={()=>provisionCalculator()}>Add earnings</button>
         */}
    <div className="statisticCard">
        {/* <div onClick={()=>onPressState("FlightNr")} className="totalEarnings">{flightNr}</div> */}
        <input  ref={FlightNr} onChange={()=>handleInputChangeEarnings(FlightNr)} type="text" className="flightNr" placeholder='FlightNr' value={flightNr}/>
        <input  ref={Earning} onChange={()=>handleInputChangeEarnings(Earning)} type='number' inputMode='numeric' pattern="[0-9]*" className="totalEarnings" placeholder='Total sales' value={totalSales}/>
        <input  ref={Crewamount} onChange={()=>handleInputChangeEarnings(Crewamount)} type='number' inputMode='numeric' pattern="[0-9]*" className="crewAmount" placeholder='Crew amout' value={crewAmount}/>
        <input  ref={Percent} onChange={()=>handleInputChangeEarnings(Percent)} type='number' inputMode='numeric' pattern="[0-9]*" className="percentValue" placeholder='%' value={percentage}/>
        {/* <div onClick={()=>onPressState("Total sales")} className="totalEarnings">{totalSales}</div> */}
        {/* <div onClick={()=>onPressState("Crew amount")} className="crewAmount">{crewAmount}</div>
        <div onClick={()=>onPressState("Percent")} className="percentValue">{percent}</div> */}
    </div>
     <div className="FormbuttonContainer">
    {/* <div onClick={()=> deleteInput()}  className="delete"> <FaAngleLeft /> </div>
    <div onClick={()=> handeClick(1)}  className="Formbutton">1</div>
    <div onClick={()=> handeClick(2)}  className="Formbutton">2</div>
    <div onClick={()=> handeClick(3)}  className="Formbutton">3</div>
    <div onClick={()=> handeClick(4)}  className="Formbutton">4</div>
    <div onClick={()=> handeClick(5)}  className="Formbutton">5</div>
    <div onClick={()=> handeClick(6)}  className="Formbutton">6</div>
    <div onClick={()=> handeClick(7)}  className="Formbutton">7</div>
    <div onClick={()=> handeClick(8)}  className="Formbutton">8</div>
    <div onClick={()=> handeClick(9)}  className="Formbutton">9</div>
    <div onClick={()=> handeClick(0)}  className="Formbutton">0</div> */}
    <div onClick={()=> provisionCalculator()} className="Formbutton">enter</div>
    </div>
    </div>
  )
}

export default Add