import dotenv from 'dotenv'
import * as firebase from "firebase/app";
import "firebase/auth";

dotenv.config()

 var firebaseConfig = {
     apiKey: "youkeyhere",
     authDomain: "yourdomainhere.firebaseapp.com",
     databaseURL: "yourdomainhere.firebaseio.com",
     projectId: "your-project-id",
     storageBucket: "yourbuckehere.appspot.com",
     messagingSenderId: "messagingSenderIdhere",
     appId: "appIdhere"
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
