import firebase from "firebase";

const config = {
  apiKey: "AIzaSyCKRZKgTAMsAY57VC3UUnpEEejx6bS_RMs",
  authDomain: "findresto-c0728.firebaseapp.com",
  databaseURL: "https://findresto-c0728.firebaseio.com",
  projectId: "findresto-c0728",
  storageBucket: "findresto-c0728.appspot.com",
  messagingSenderId: "1075941031711"
};

const fbase = firebase.initializeApp(config);

export default fbase;
