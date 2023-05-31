import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABXoTaWKVC90muWI80M450fZEqCU0vLYg",
  authDomain: "react-api-ea076.firebaseapp.com",
  projectId: "react-api-ea076",
  storageBucket: "react-api-ea076.appspot.com",
  messagingSenderId: "366155263765",
  appId: "1:366155263765:web:5e2fdd041cf9680f9e431c",
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
