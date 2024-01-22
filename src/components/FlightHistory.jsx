import React, { useContext } from "react";
import FlightList from "./FlightList";
import Nav from "./Nav";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";
import DataContext from "../store/dataContext";

// import Backbutton from "./Backbutton";

function FlightHistory() {
  const { currentFlights, totalProvision, loading, noData, setCurrentFlights } = useContext(DataContext);
  


  return (
    <div className="flightHistory">
      {/* <Backbutton /> */}
      <Header heading={"Commission"}/>
      <h1 className="flightListHeading">Commission</h1>
      {noData && <h2>Currently no flights added..</h2>}
      <ol className="orientedList">
        {currentFlights && currentFlights.map((preFlight, i) => {
          return (
            <li key={i} className="history-li">
              <FlightList flight={preFlight} setCurrentFlights={setCurrentFlights}/>
            </li>
          );
        })}
      </ol>

      {totalProvision ? <h2 className="totalProvisionHeading">
        Total {totalProvision}kr
      </h2> : ""}
      {loading ? <LoadingSpinner /> : ""}
      <Nav page={"history"}/>
    </div>
  );
}

export default FlightHistory;
