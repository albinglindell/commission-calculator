import React, { useEffect, useState } from "react";
import FlightList from "./FlightList";
import Backbutton from "./Backbutton";

function FlightHistory() {
  const [currentFlights, setCurrentFlights] = useState([]);
  useEffect(() => {
    setCurrentFlights(JSON.parse(localStorage.getItem("flights")));
  }, []);

  const totalProvision = localStorage.getItem("total-provision-earned");

  return (
    <div className="flightHistory">
      <Backbutton />
      <h1 className="flightListHeading">previous flight</h1>
      {!currentFlights && <h2>Currently no flights added..</h2>}
      <ol className="orientedList">
        {currentFlights && currentFlights.map((preFlight) => {
          return (
            <li>
              <FlightList flight={preFlight} />
            </li>
          );
        })}
      </ol>

      {currentFlights && <h2 className="totalProvisionHeading">
        Total commission: {totalProvision}kr
      </h2>}
    </div>
  );
}

export default FlightHistory;
