import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homescreen from "./components/Homescreen";
import Add from "./components/Add";
import FlightHistory from "./components/FlightHistory";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, onAuthStateChanged  } from 'firebase/auth';
import { useEffect, useState } from "react";
import Login from "./components/Login";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIlCmgdJxcsAmy4mf0R5b5L-R63OiHdq8",
  authDomain: "commission-7410f.firebaseapp.com",
  projectId: "commission-7410f",
  storageBucket: "commission-7410f.appspot.com",
  messagingSenderId: "498298965728",
  appId: "1:498298965728:web:1e95a92d632ed0f2c74a85",
  measurementId: "G-XLPGJ72QYC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

// Get a list of cities from your database






function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);



  
  async function getData() {
    const querySnapshot = await getDocs(collection(db, "flight"));
    querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      // Process your document data here
    });
  }

  getData()
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
