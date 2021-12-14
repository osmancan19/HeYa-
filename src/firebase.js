import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyB5e9ZprU1IKWUNwmPUxQUgZxXLfqEskHg",
  authDomain: "rotary-chat-35f3b.firebaseapp.com",
  projectId: "rotary-chat-35f3b",
  storageBucket: "rotary-chat-35f3b.appspot.com",
  messagingSenderId: "725291700798",
  appId: "1:725291700798:web:aab9036c9c3eeed8aeb76f"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth()
const provider = new GoogleAuthProvider()

export { auth, provider}
export default db