// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfAq_Kv9ufQvM4ca7Sr1AlzHJnFnHniyg",
  authDomain: "authfirebase-d097c.firebaseapp.com",
  projectId: "authfirebase-d097c",
  storageBucket: "authfirebase-d097c.appspot.com",
  messagingSenderId: "562488653387",
  appId: "1:562488653387:web:db9155b7610b854c4a7fce",
  measurementId: "G-S677NHYKZ5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
