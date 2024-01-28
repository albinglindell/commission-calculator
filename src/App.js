import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homescreen from "./components/Homescreen";
import Add from "./components/Add";
import FlightHistory from "./components/FlightHistory";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { useContext, useEffect } from "react";
import Login from "./components/Login";
import DataContext from "./store/dataContext";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBIlCmgdJxcsAmy4mf0R5b5L-R63OiHdq8",
//   authDomain: "commission-7410f.firebaseapp.com",
//   projectId: "commission-7410f",
//   storageBucket: "commission-7410f.appspot.com",
//   messagingSenderId: "498298965728",
//   appId: "1:498298965728:web:1e95a92d632ed0f2c74a85",
//   measurementId: "G-XLPGJ72QYC"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// // const analytics = getAnalytics(app);
// const auth = getAuth(app);

// // Get a list of cities from your database






function App() {
  const { user, auth, fetchData } = useContext(DataContext);

  useEffect(() => {
    fetchData()
  }, [user]);



  

  return (
    <div className="App">
      {user ? 
      <Routes>
        <Route path="/" element={<Homescreen />} />
        <Route path="/AddFlight" element={<Add />} />
        <Route path="/FlightHistory" element={<FlightHistory />} />
      </Routes>
      :   
      <Routes>
        <Route path="/" element={<Login auth={auth}/>} />
      </Routes>
     }
      

    </div>
  
  );
}

export default App;
