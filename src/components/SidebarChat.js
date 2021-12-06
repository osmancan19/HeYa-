import { Avatar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import db from '../firebase'
import '../css/SidebarChat.css'
import { Link } from 'react-router-dom'

import { query, addDoc, doc, onSnapshot, collection, orderBy } from 'firebase/firestore'

function SidebarChat({ id, name, addNewChat }) {
  const [seed, setSeed] = useState('')
  const [messages, setMessages] = useState('')

  useEffect(() => {
    if (id) {
      const docRef = doc(db, "rooms", id)
      const messagesQuery = query(collection(docRef, "messages"), orderBy("timestamp", "desc"))
      const messageUnsub = onSnapshot(messagesQuery, (querySnapshot) => {
        setMessages(querySnapshot.docs.map((d) => 
          d.data()
        ))
      })
    }
  }, [id])

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const createChat = () => {
    const roomName = prompt("Please enter nae for chat.")

    if (roomName) {
      const docRef = addDoc(collection(db, "rooms"), {
        name: roomName
      })
    }
  }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat}
      className="sidebarChat">
        <h2>Add New Chat</h2>
    </div>
  )
}

export default SidebarChat
