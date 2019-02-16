import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
let config = {
  apiKey: "AIzaSyC4y_UiuUZI1GUaRxiJTT7iSMDahpwj_Bc",
  authDomain: "nevermind-ad1ae.firebaseapp.com",
  databaseURL: "https://nevermind-ad1ae.firebaseio.com",
  projectId: "nevermind-ad1ae",
  storageBucket: "nevermind-ad1ae.appspot.com",
  messagingSenderId: "1077643302463"
};
firebase.initializeApp(config);
let firestore = firebase.firestore()
export let memeRef = firestore.collection('memes')

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

