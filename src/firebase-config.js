// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEcwt7Xm0c6KFAIhsKGZzeVBzpZB7Xcms",
  authDomain: "telford-church-website.firebaseapp.com",
  projectId: "telford-church-website",
  storageBucket: "telford-church-website.appspot.com",
  messagingSenderId: "644385683078",
  appId: "1:644385683078:web:eb9a0a97e3c29a149d8307",
  measurementId: "G-0WR3HP7N8D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics };