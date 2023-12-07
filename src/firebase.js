// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkSneulp1dGRe_6ZceaoUo5pF2VCnbuOA",
  authDomain: "budget-e9ab5.firebaseapp.com",
  databaseURL: "https://budget-e9ab5.firebaseio.com",
  projectId: "budget-e9ab5",
  storageBucket: "budget-e9ab5.appspot.com",
  messagingSenderId: "463579991578",
  appId: "1:463579991578:web:7b29a0bd265353017d8ba3",
  measurementId: "G-7KD8SV8MJR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
import { getStorage } from "firebase/storage";

const storage = getStorage(app);
export { storage };
