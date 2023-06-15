import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homescreen from "./components/Homescreen";
import Add from "./components/Add";
import FlightHistory from "./components/FlightHistory";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/AddFlight" element={<Add />} />
        <Route path="/FlightHistory" element={<FlightHistory />} />
      </Routes>
    </div>
  );
}

export default App;
