import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
let config = {
  apiKey: "AIzaSyCGN8a9Yaw3GL1Bj1YmPrHTrsRJMRBmIXs",
  authDomain: "fir-hub-3a019.firebaseapp.com",
  databaseURL: "https://fir-hub-3a019.firebaseio.com",
  projectId: "fir-hub-3a019",
  storageBucket: "fir-hub-3a019.appspot.com",
  messagingSenderId: "765151449645"
};
firebase.initializeApp(config);
let firestore = firebase.firestore()
export let memeRef = firestore.collection('memes')

//GUARDAR MEMES
export function saveMeme(meme) {
  // console.log(meme)
  memeRef.add(meme)
}

//FIREBASE LOGIN
export function gmailLogin() {
  var provider = new firebase.auth.GoogleAuthProvider()
  return firebase.auth()
    .signInWithPopup(provider)
    .then(function (result) {
      let userText = JSON.stringify(result.user)
      localStorage.setItem('user', userText)
      return result.user
      //user = result.user
      // setUser()
    })
}

export let logOut = () => {
  firebase.auth().signOut()
  localStorage.removeItem('user')
}

export default firebase

