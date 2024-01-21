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

exports.getflight = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    // Your function logic goes here.
    const db = admin.firestore();
    db.collection('flight').get()
      .then(snapshot => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        response.json(data);
      })
      .catch(error => {
        console.error("Error getting documents: ", error);
        response.status(500).send(error);
      });
  });
});

// exports.addflight = functions.https.onRequest((request, response) => {
//   cors(request, response, async () => {
//     if (request.method !== 'POST') {
//       return response.status(405).send('Method Not Allowed');
//     }

//     const db = admin.firestore();
//     const flightData = request.body;

//     try {
//       const res = await db.collection('flight').add(flightData);
//       response.status(201).send({ id: res.id, ...flightData });
//     } catch (error) {
//       console.error("Error adding document: ", error);
//       response.status(500).send(error);
//     }
//   });
// });


exports.addflight = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    if (request.method !== 'POST') {
      return response.status(405).send('Method Not Allowed');
    }

    try {
      const token = request.get('Authorization').split('Bearer ')[1];
      const decodedToken = await admin.auth().verifyIdToken(token);
      const userId = decodedToken.uid;
      
      const flughtData = request.body; // The data to be added/updated in the user's document
      const db = admin.firestore();
      const userDocRef = db.collection('users').doc(userId);
      
      await userDocRef.set({ flight: flughtData }, { merge: true });
      response.status(200).send(`User ${userId} flight updated.`);
    } catch (error) {
      console.error("Error updating user's flight: ", error);
      response.status(500).send(error);
    }
  });
});

exports.addflight = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    if (request.method !== 'POST') {
      return response.status(405).send('Method Not Allowed');
    }

    const db = admin.firestore();
    const flightData = request.body;

    try {
      const res = await db.collection('flight').add(flightData);
      response.status(201).send({ id: res.id, ...flightData });
    } catch (error) {
      console.error("Error adding document: ", error);
      response.status(500).send(error);
    }
  });
});
exports.deleteflight = functions.https.onRequest((request, response) => {
  cors(request, response, async () => {
    if (request.method !== 'DELETE') {
      return response.status(405).send('Method Not Allowed');
    }

    const db = admin.firestore();
    const flightId = request.query.id; // Assuming the ID is passed as a query parameter

    if (!flightId) {
      return response.status(400).send('No flight ID provided');
    }

    try {
      await db.collection('flight').doc(flightId).delete();
      response.status(200).send(`Document with ID ${flightId} successfully deleted`);
    } catch (error) {
      console.error("Error deleting document: ", error);
      response.status(500).send(error);
    }
  });
});
