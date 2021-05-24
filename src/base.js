import firebase from "firebase";
import "firebase/storage";

export const app = firebase.initializeApp({
  projectId: "e-shop-d051e",
  appId: "1:855311977355:web:9a28f03d4a04e34feb3d8e",
  databaseURL:
    "https://e-shop-d051e-default-rtdb.europe-west1.firebasedatabase.app",
  storageBucket: "e-shop-d051e.appspot.com",
  locationId: "europe-central2",
  apiKey: "AIzaSyACbkEzWwbaNw9RYxCQxaMygVljKavpdxg",
  authDomain: "e-shop-d051e.firebaseapp.com",
  messagingSenderId: "855311977355",
});
