import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBNBg0UejbMZpi9gwGev9lPi3mcrh5EOlc",
  authDomain: "chalicom.firebaseapp.com",
  databaseURL:
    "https://chalicom-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chalicom",
  storageBucket: "chalicom.appspot.com",
  messagingSenderId: "293930822459",
  appId: "1:293930822459:web:29db64f66ebf4cd7a2251e",
};

const app = initializeApp(firebaseConfig);

export default app;
