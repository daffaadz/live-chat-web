// Import modul dari Firebase
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue } from "firebase/database";

// Konfigurasi Firebase Anda
const firebaseConfig = {
  apiKey: "AIzaSyBWbabMVERdHHjMbC2HiBVl3veAmob1tGY",
  authDomain: "portofolio-ec970.firebaseapp.com",
  databaseURL: "https://portofolio-ec970-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "portofolio-ec970",
  storageBucket: "portofolio-ec970.appspot.com", // Perbaikan URL di sini
  messagingSenderId: "413215492023",
  appId: "1:413215492023:web:cc0e0f8cbdeab226208a32",
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);

// Inisialisasi Realtime Database
const database = getDatabase(app);

// Ekspor fungsi yang diperlukan
export { database, ref, push, onValue };


// https://firebase.google.com/docs/web/setup#available-libraries