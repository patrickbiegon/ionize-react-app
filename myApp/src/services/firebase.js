import dotenv from 'dotenv'
import * as firebase from "firebase/app";
import "firebase/auth";

dotenv.config()

 var firebaseConfig = {
     apiKey: "AIzaSyDGNhtuNrydyVIXjmdHkYKmxJH_maDJt9E",
     authDomain: "social-pwa-login.firebaseapp.com",
     databaseURL: "https://social-pwa-login.firebaseio.com",
     projectId: "social-pwa-login",
     storageBucket: "social-pwa-login.appspot.com",
     messagingSenderId: "357723739362",
     appId: "1:357723739362:web:f7415caf7c4f606be1fabb"
 };
 // Initialize Firebase
 firebase.initializeApp(firebaseConfig);
 
export const auth = firebase.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider).then((res) => {
    //console.log(res.user)
  }).catch((error) => {
    //console.log(error.message)
  })
}

export const signInWithFacebook = () => {
  auth.signInWithPopup(facebookProvider).then((res) => {
    //console.log(res.user)
  }).catch((error) => {
    //console.log(error.message)
  })
}
