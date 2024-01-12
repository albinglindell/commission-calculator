import React, { useEffect, useState } from "react";
import FlightList from "./FlightList";

// import Backbutton from "./Backbutton";

function FlightHistory() {
  const [currentFlights, setCurrentFlights] = useState([]);
  useEffect(() => {
    setCurrentFlights(JSON.parse(localStorage.getItem("flights")));
  }, []);

  const totalProvision = localStorage.getItem("total-provision-earned");

  return (
    <div className="flightHistory">
      {/* <Backbutton /> */}
      <h1 className="flightListHeading">Commission</h1>
      {!totalProvision && <h2>Currently no flights added..</h2>}
      <ol className="orientedList">
        {currentFlights && currentFlights.map((preFlight) => {
          return (
            <li className="history-li">
              <FlightList flight={preFlight} setCurrentFlights={setCurrentFlights}/>
            </li>
          );
        })}
      </ol>

      {totalProvision ? <h2 className="totalProvisionHeading">
        Total {totalProvision}kr
      </h2> : ""}
    </div>
  );
}

export default FlightHistory;
