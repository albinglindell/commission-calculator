import React, { useEffect, useState } from 'react';
import DataContext from './dataContext';
import {  GoogleAuthProvider, signInWithPopup  } from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore } from 'firebase/firestore';

const DataProvider = ({ children }) => {
  const [currentFlights, setCurrentFlights] = useState([]);
  const [totalProvision, setTotalProvision] = useState(0);
  const [loading, setLoading] = useState(true);
  const [noData, setNoData] = useState(false);
  const [user, setUser] = useState(false);
  const [deletionCount, setDeletionCount] = useState(0);
//   const navigate = useNavigate()


  const fetchData = async () => {
    const token = await user.getIdToken();

    fetch('https://us-central1-commission-7410f.cloudfunctions.net/getflight', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token 
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      setCurrentFlights(data);
      const total = data.reduce((acc, obj) => Number(acc) + Number(obj.provision), 0);
      setTotalProvision(total);
      setLoading(false);
      setNoData(!data || data.length === 0);
    })
    .catch(error => {
      console.error('Error fetching flights:', error);
      setCurrentFlights([]);
      setTotalProvision(0);
      setLoading(false);
      setNoData(true);
    });
  };
  

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
    setLoading(true)
    try {
      const response = await fetch(`https://us-central1-commission-7410f.cloudfunctions.net/deleteflight?id=${planeId}`, {
        method: 'DELETE'
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setDeletionCount(deletionCount => deletionCount + 1)
      console.log('Delete response:', await response.text());
      setLoading(false)
    } catch (error) {
        console.error('Error deleting plane:', error);
        setLoading(false)
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
        user
        }}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;
