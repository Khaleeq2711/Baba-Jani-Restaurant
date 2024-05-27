// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";    //adding SDKs

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyC3xvzRqkoRTcLZZxh6vbP5HTOoQXyJ-pM",
  authDomain: "baba-jani-a1d23.firebaseapp.com",
  databaseURL:
    "https://baba-jani-a1d23-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "baba-jani-a1d23",
  storageBucket: "baba-jani-a1d23.appspot.com",
  messagingSenderId: "1041241340886",
  appId: "1:1041241340886:web:7c63978be9e9930f798277",
  measurementId: "G-Y7SLCX729C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
