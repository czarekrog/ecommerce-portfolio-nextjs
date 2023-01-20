// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
import { Auth, initializeAuth, browserLocalPersistence } from "firebase/auth";
import { Firestore, getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

// Initialize Firebase

export let app = {} as FirebaseApp;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
}

export let firebaseAuth = {} as Auth;

if (typeof window !== "undefined") {
  firebaseAuth = initializeAuth(app, {
    persistence: browserLocalPersistence,
  });
}

export let firestore = {} as Firestore;

if (typeof window !== "undefined") {
  firestore = getFirestore(app);
}
