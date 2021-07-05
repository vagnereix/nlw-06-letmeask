import firebase from "firebase/app";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAc6H4ejeEKxTGvm2BGzSdnmrK_cqmhwTk",
  authDomain: "letmeask-b43a3.firebaseapp.com",
  databaseURL: "https://letmeask-b43a3-default-rtdb.firebaseio.com",
  projectId: "letmeask-b43a3",
  storageBucket: "letmeask-b43a3.appspot.com",
  messagingSenderId: "90204818997",
  appId: "1:90204818997:web:1a8d44ad355bf31f1c2b7c",
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const database = firebase.database();
