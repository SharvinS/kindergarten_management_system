import firebase from "firebase/app";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "YOUR_FIREBASE_apiKey",
  authDomain: "YOUR_FIREBASE_authDomain",
  databaseURL: "YOUR_FIREBASE_databaseURL",
  projectId: "YOUR_FIREBASE_projectId",
  storageBucket: "YOUR_FIREBASE_storageBucket",
  messagingSenderId: "YOUR_FIREBASE_messagingSenderId",
  appId: "YOUR_FIREBASE_appId",

};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
