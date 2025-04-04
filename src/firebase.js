import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJ50UYLXfrUo74cNLBRptOAsws9evuWoM",
  authDomain: "planner-b55ca.firebaseapp.com",
  projectId: "planner-b55ca",
  storageBucket: "planner-b55ca.firebasestorage.app",
  messagingSenderId: "119304446763",
  appId: "1:119304446763:web:26db20178bf2382b75db6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };
