import React, { useEffect, useState } from "react";
import FlightList from "./FlightList";
import Nav from "./Nav";
import Header from "./Header";
import LoadingSpinner from "./LoadingSpinner";

// import Backbutton from "./Backbutton";

function FlightHistory() {
  const [currentFlights, setCurrentFlights] = useState([]);
  const [totalProvision, setTotalProvision] = useState();
  const [deletionCount, setDeletionCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);

  const deletePlane = async (planeId) => {
    try {
      const response = await fetch(`https://us-central1-commission-7410f.cloudfunctions.net/deleteflight?id=${planeId}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setDeletionCount(deletionCount => deletionCount + 1)
      console.log('Delete response:', await response.text());
    } catch (error) {
      console.error('Error deleting plane:', error);
    }
  };

  useEffect(() => {
    setLoading(true)
    fetch('https://us-central1-commission-7410f.cloudfunctions.net/getflight')
      .then(response => response.json())
      .then(data => {
        setCurrentFlights(data);
        // Now calculate totalProvision here after currentFlights is set
        const total = data.reduce((acc, obj) => Number(acc) + Number(obj.provision), 0);
        setTotalProvision(total);
        setLoading(false)
        if(!data){
          setNoData(true)
        }
        else{
          setNoData(false)
        }
      })
      .catch(error => {
        console.error('Error fetching planes:', error);
        setTotalProvision(0); // Handle error case
      });
  }, [deletionCount]); // Reacts to changes in deletionCount, triggering re-fetch
  



  return (
    <div className="flightHistory">
      {/* <Backbutton /> */}
      <Header heading={"Commission"}/>
      {/* <h1 className="flightListHeading">Commission</h1> */}
      {noData && <h2>Currently no flights added..</h2>}
      <ol className="orientedList">
        {currentFlights && currentFlights.map((preFlight, i) => {
          return (
            <li key={i} className="history-li">
              <FlightList deletePlane={deletePlane}  flight={preFlight} setCurrentFlights={setCurrentFlights}/>
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
