import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Firebase Configuration
const firebaseConfig = {
apiKey: "AIzaSyARfY1WkE58mzCyJtdmAqBxtcuKC25spz0",
authDomain: "my-project-52b81.firebaseapp.com",
databaseURL: "https://my-project-52b81-default-rtdb.asia-southeast1.firebasedatabase.app",
projectId: "my-project-52b81",
storageBucket: "my-project-52b81.firebasestorage.app",
messagingSenderId: "349562523212",
appId: "1:349562523212:web:14f9b6a12aa6473de0aee9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Initialize Realtime Database
export const database = getDatabase(app);
