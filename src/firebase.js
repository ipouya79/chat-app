import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyBQfWIar0xP5zPCSUsk0_FBh-zelIKnKtM",
  authDomain: "pouyamessanger-be358.firebaseapp.com",
  projectId: "pouyamessanger-be358",
  storageBucket: "pouyamessanger-be358.appspot.com",
  messagingSenderId: "1051132558421",
  appId: "1:1051132558421:web:125e38e7ac37a03b2068dc"
  }).auth();




 