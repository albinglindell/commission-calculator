import React, { useContext, useEffect, useState } from "react";
import FlightList from "./FlightList";
import Nav from "./Nav";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import DataContext from "../store/dataContext";
// import { SlArrowLeft } from "react-icons/sl";
// import { SlArrowRight } from "react-icons/sl";


// import Backbutton from "./Backbutton";

function FlightHistory() {
  const { currentFlights, loading, setCurrentFlights, monthlyTotals } = useContext(DataContext);
  const [currentDay, setCurrentDay] = useState()
  // const [currentMonthIndex, setCurrendMonthIndex] = useState(1)
  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const d = new Date();
useEffect(()=>{
  setCurrentDay(month[d.getMonth()])
},[])

// const increese = ()=>{
//   setCurrendMonthIndex(currentMonthIndex + 1)
//   if(currentDay === "December"){
//     console.log(currentMonthIndex)
//     setCurrendMonthIndex(0 - d.getMonth())
//     setCurrentDay(month[0])
//   } else {
//     setCurrentDay(month[currentDay + currentMonthIndex])
//     console.log(currentMonthIndex)
//   }
// }
// const decreese = ()=>{
//   setCurrentDay(month[d.getMonth() - 1])
// }
let currentMonth = new Date().getMonth();
let sortedFlights = currentFlights
.filter(flight => new Date(flight.date).getMonth() === currentMonth)
  .sort((a, b) => new Date(a.date) + new Date(b.date));



const getCurrentYearAndMonth = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 because getMonth() returns 0-11
  return `${year}-${month}`;
};

const filterDataForCurrentMonth = () => {
  const currentYearMonth = getCurrentYearAndMonth();
  return Object.entries(monthlyTotals)
    .filter(([key, value]) => key.startsWith(currentYearMonth))
    .sort((a, b) => a[0].localeCompare(b[0]));
};


const filteredData = filterDataForCurrentMonth();

const isDataEmpty = filteredData.length === 0;

  return (
    <div className="flightHistory">
      {/* <Backbutton /> */}
      <Header heading={"Commission"}/>
      <div className="monthContainer">
      {/* <SlArrowLeft onClick={()=>decreese()} /> */}
      <h1 className="flightListHeading">{currentDay}</h1>
      {/* <SlArrowRight onClick={()=>increese()} /> */}
      </div>

      {isDataEmpty && <h2>Currently no flights added..</h2>}
      <ol className="orientedList">
        {currentFlights && sortedFlights.map((preFlight, i) => {
          return (
            <li key={i} className="history-li">
              <FlightList flight={preFlight} setCurrentFlights={setCurrentFlights}/>
            </li>
          );
        })}
      </ol>

      {!isDataEmpty ? <h2 className="totalProvisionHeading">
        Total  {filteredData.map(([date, value]) => (
          value
        ))}kr
      </h2> : <h2 className="totalProvisionHeading">Total: 0Kr</h2>}
      {loading ? <LoadingSpinner /> : ""}
      <Nav page={"history"}/>
    </div>
  );
}

export default FlightHistory;
