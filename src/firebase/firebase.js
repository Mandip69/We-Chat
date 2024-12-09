import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlqcxwsdQcukzgchmEgoAfV4DbX-0fgz0",
  authDomain: "fir-chat-271a8.firebaseapp.com",
  projectId: "fir-chat-271a8",
  storageBucket: "fir-chat-271a8.firebasestorage.app",
  messagingSenderId: "429856489687",
  appId: "1:429856489687:web:4d9040ebd1712836ec3092",
  measurementId: "G-F35BR65TH8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);