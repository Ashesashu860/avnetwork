import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCQvfsF6HcVHA2ZwHv65AnOiG4fdtRXrwM",
  authDomain: "avnetwork-21578.firebaseapp.com",
  projectId: "avnetwork-21578",
  storageBucket: "avnetwork-21578.appspot.com",
  messagingSenderId: "334205136148",
  appId: "1:334205136148:web:3fd8bb04164550f98ca601",
  measurementId: "G-RCKQHDVSBX",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
