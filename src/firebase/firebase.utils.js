import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyA8FTrskeHdkfUu3UhUcYG44nG5KgSGC1k",
  authDomain: "crwn-db-176a8.firebaseapp.com",
  projectId: "crwn-db-176a8",
  storageBucket: "crwn-db-176a8.appspot.com",
  messagingSenderId: "927521455366",
  appId: "1:927521455366:web:02ca068ea9f655dff2b287",
  measurementId: "G-0E55L1H7F4"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get()

  if(!snapShot.exists) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }

  return userRef
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase