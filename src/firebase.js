import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD7napnvGbo_xIajMup0gNx328bnNNW8P0",
  authDomain: "heya-ecf6b.firebaseapp.com",
  projectId: "heya-ecf6b",
  storageBucket: "heya-ecf6b.appspot.com",
  messagingSenderId: "776563651634",
  appId: "1:776563651634:web:55ce6df19ef3a28a05b82b"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth()
const provider = new GoogleAuthProvider()

export { auth, provider}
export default db