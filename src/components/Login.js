import React from 'react'
import { Button } from '@mui/material'
import '../css/Login.css'
import { auth, provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useStateValue } from './StateProvider'
import { actionTypes } from './reducer'

function Login() {
  const [state, dispatch] = useStateValue()

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user
        })
      })
      .catch((error) => alert(error.message))
  }

  return (
    <div className="login">
      <div className="login_container">
        <img src="https://i.hizliresim.com/blvh6ey.png" alt=""/>
        <div className="login_text">
          <h1>Rotary Chat</h1>
          <br></br>
          <h2 >Make Your Own Group Chat</h2>
        </div>
        
        <Button type="submit" onClick={signIn}>
          <img src = "https://i.hizliresim.com/7nt742o.png" width="30" height="30" ></img>
          Sign In With Google Account
        </Button>
      </div>
    </div>
  )
}

export default Login