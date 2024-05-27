// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDwZmY688lZv8ZNNknn_bifEquohcVmGlo",
  authDomain: "metall-81fa5.firebaseapp.com",
  projectId: "metall-81fa5",
  storageBucket: "metall-81fa5.appspot.com",
  messagingSenderId: "72488279934",
  appId: "1:72488279934:web:ea1a9a6e28f3f871f19d2f",
  databaseURL: "https://metall-81fa5-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);