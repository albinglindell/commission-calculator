/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started


const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

admin.initializeApp();

// exports.getflight = functions.https.onRequest((request, response) => {
//   cors(request, response, () => {
//     // Your function logic goes here.
//     const db = admin.firestore();
//     db.collection('flight').get()
//       .then(snapshot => {
//         const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         response.json(data);
//       })
//       .catch(error => {
//         console.error("Error getting documents: ", error);
//         response.status(500).send(error);
//       });
//   });
// });

exports.getflight = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    if (request.method !== 'GET') {
      return response.status(405).send('Method Not Allowed');
    }

    try {
      const token = request.get('Authorization').split('Bearer ')[1];
      const decodedToken = await admin.auth().verifyIdToken(token);
      const userId = decodedToken.uid;

      const db = admin.firestore();
      const userFlightsRef = db.collection('users').doc(userId).collection('flights');
      
      const snapshot = await userFlightsRef.get();
      const flights = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      response.status(200).json(flights);
    } catch (error) {
      console.error("Error getting user's flights: ", error);
      response.status(500).send(error);
    }
  });
});


exports.addFlight = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    if (request.method !== 'POST') {
      return response.status(405).send('Method Not Allowed');
    }

    try {
      const token = request.get('Authorization').split('Bearer ')[1];
      const decodedToken = await admin.auth().verifyIdToken(token);
      const userId = decodedToken.uid;
      
      const flightData = request.body; // The flight data to be added
      const db = admin.firestore();
      const userFlightsRef = db.collection('users').doc(userId).collection('flights');

      // Add a new document to the 'flights' sub-collection
      const newFlightRef = await userFlightsRef.add(flightData);
      response.status(200).send(`Flight added with ID: ${newFlightRef.id} for user ${userId}.`);
    } catch (error) {
      console.error("Error adding user's flight: ", error);
      response.status(500).send(error);
    }
  });
});

exports.deleteflight = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    if (request.method !== 'DELETE') {
      return response.status(405).send('Method Not Allowed');
    }

    try {
      const token = request.get('Authorization').split('Bearer ')[1];
      const decodedToken = await admin.auth().verifyIdToken(token);
      const userId = decodedToken.uid;

      const db = admin.firestore();
      const flightId = request.query.id; // Assuming the ID is passed as a query parameter

      if (!flightId) {
        return response.status(400).send('No flight ID provided');
      }

      // Check if the flight belongs to the user
      const flightRef = db.collection('users').doc(userId).collection('flights').doc(flightId);
      const flightDoc = await flightRef.get();

      if (!flightDoc.exists) {
        return response.status(404).send('Flight not found');
      }

      // Delete the flight
      await flightRef.delete();
      response.status(200).send(`Flight with ID ${flightId} successfully deleted`);
    } catch (error) {
      console.error("Error deleting flight: ", error);
      response.status(500).send(error);
    }
  });
});
