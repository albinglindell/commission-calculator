import React, { useEffect, useState } from 'react';
import DataContext from './dataContext';
import {  GoogleAuthProvider, signInWithPopup,getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
const DataProvider = ({ children }) => {
  const [currentFlights, setCurrentFlights] = useState([]);
  const [totalProvision, setTotalProvision] = useState(0);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [user, setUser] = useState(false);
  const [deletionCount, setDeletionCount] = useState(0);
  const [wrongDetails, setWrongDetails] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [monthlyTotals, setMonthlyTotals] = useState();


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
const auth = getAuth(app);

// Get a list of cities from your database

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    fetchData()
    return () => unsubscribe();
  }, [setUser]);


  const fetchData = async () => {
    setLoading(true);
    let token = '';
    if (user) {
      token = await user.getIdToken();
    }
  
    if(user) { 
      try {
        const response = await fetch('https://us-central1-commission-7410f.cloudfunctions.net/getflight', {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer ' + token 
          }
        });
  
        const data = await response.json();
  
        if (Array.isArray(data) && data.length > 0) {
          setCurrentFlights(data);
  
          // Group flights by month and sum up the provisions
          const monthlyTotals = data.reduce((acc, flight) => {
            const flightDate = new Date(flight.date);
            const monthYearKey = `${flightDate.getFullYear()}-0${flightDate.getMonth() + 1}`
  
            acc[monthYearKey] = (acc[monthYearKey] || 0) + Number(flight.provision);
            return acc;
          }, {});
  
          let sortedArray = Object.entries(monthlyTotals).sort((a, b) => {
            return a[0].localeCompare(b[0]);
        });
        
        // If you need the result as an object
        let sortedObject = Object.fromEntries(sortedArray);


          // Set the state for monthly totals
          setMonthlyTotals(sortedObject);
          // Calculate the total provision for all flights
          const total = Object.values(monthlyTotals).reduce((sum, value) => sum + value, 0);
          setTotalProvision(total.toFixed(1));
        } else {
          // Handle the case where data is not in the expected format or is empty
          setCurrentFlights([]);
          setTotalProvision(0);
          setMonthlyTotals({});
        }
  
        setLoading(false);
        setNoData(!data || data.length === 0);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error state
        setCurrentFlights([]);
        setTotalProvision(0);
        setMonthlyTotals({});
        setLoading(false);
        setNoData(true);
      }
    }
  };
  
  // const fetchData = async () => {
  //   setLoading(true)
  //   let token = '';
  //   if (user) {
  //     token = await user.getIdToken();
  //   }
  
  //     if(user){ try {
  //     const response = await fetch('https://us-central1-commission-7410f.cloudfunctions.net/getflight', {
  //       method: 'GET',
  //       headers: {
  //         'Authorization': 'Bearer ' + token 
  //       }
  //     });
  
  //     const data = await response.json();
  
  //     if (Array.isArray(data) && data.length > 0) {
  //       setCurrentFlights(data);
  //       const total = data.reduce((acc, obj) => Number(acc) + Number(obj.provision), 0);
  //       setTotalProvision(total.toFixed(1));
  //     } else {
  //       // Handle the case where data is not in the expected format or is empty
  //       setCurrentFlights([]);
  //       setTotalProvision(0);
  //     }
  
  //     setLoading(false);
  //     setNoData(!data || data.length === 0);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //     // Handle error state
  //     setCurrentFlights([]);
  //     setTotalProvision(0);
  //     setLoading(false);
  //     setNoData(true);
  //   }}
  // };
  
  const addPlaneToUserCollection = async (planeData) => {
        
    setLoading(true)
  
    if (user) {
      const token = await user.getIdToken();
      const response = await fetch('https://us-central1-commission-7410f.cloudfunctions.net/addFlight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(planeData)
      });
      // Handle response
      console.log("added: ",response)
      setLoading(false)
      fetchData()
    } else {
      // User not logged in
    }
  };

  const deletePlane = async (planeId) => {
    let token
    if(user){
        token = await user.getIdToken();
    }

    setLoading(true);
    try {
      const response = await fetch(`https://us-central1-commission-7410f.cloudfunctions.net/deleteflight?id=${planeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + token // Include the Firebase ID token in the request headers
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setDeletionCount(deletionCount => deletionCount + 1);
      console.log('Delete response:', await response.text());
      setLoading(false);
    } catch (error) {
      console.error('Error deleting plane:', error);
      setLoading(false);
    }
  };
   
  const signInWithGoogle = (auth) => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // Get user info from the sign-in result
        const user = result.user;

        // Get Firestore instance
        const db = getFirestore();
  
        // Reference to the user's document in Firestore
        const userRef = doc(db, 'users', user.uid);
  
        // Check if user already exists in Firestore
        const docSnap = await getDoc(userRef);
  
        if (!docSnap.exists()) {
          // If user does not exist, add them to Firestore
          await setDoc(userRef, {
            name: user.displayName,
            email: user.email,
            profilePic: user.photoURL
            // ... any other user info you want to store
          });
        }
  
        // Additional logic after user sign-in or creation in Firestore
        // ...
      })
      .catch((error) => {
        console.error("Error during sign in with Google", error);
        // Handle sign-in errors
      });
  };

  const registerWithEmailPassword = (email, password, displayName) => {
    const auth = getAuth();
  
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // User is registered
        const registredUser = userCredential.user;
  
        // Get Firestore instance
        const db = getFirestore();
  
        // Add the new user to Firestore
        const userRef = doc(db, 'users', registredUser.uid);
        await setDoc(userRef, {
          name: displayName,
          email: registredUser.email,
          // Add any other relevant user info
        });
        // Additional logic after user creation in Firestore
        setUser(registredUser)
        setAuthenticated(true)
        setWrongDetails(false)

      })
      .catch((error) => {
        console.error("Error during registration", error);
        // Handle registration errors
      });
  };


  const signInWithEmailPassword = (email, password) => {
    const auth = getAuth();
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User is signed in
        const user = userCredential.user;
        
        // Additional logic after user sign-in
        // ...
        setUser(user)
        setWrongDetails(false)
        setAuthenticated(true)
      })
      .catch((error) => {
        console.error("Error during sign in with email and password", error);
        // Handle sign-in errors
        setWrongDetails(true)
      });
  };
  // Fetch data when the component mounts
  useEffect(() => {
      fetchData();
    //   currentFlights.reduce()
  }, [deletionCount]); // Empty dependency array to run only once

  return (
    <DataContext.Provider value={{
        fetchData, 
        currentFlights,
        totalProvision,
        loading,
        noData, 
        setDeletionCount,
        deletionCount,
        setCurrentFlights,
        addPlaneToUserCollection,
        deletePlane,
        signInWithGoogle,
        setUser,
        user,
        auth,
        registerWithEmailPassword,
        signInWithEmailPassword,
        wrongDetails,
        authenticated,
        monthlyTotals,
        }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
