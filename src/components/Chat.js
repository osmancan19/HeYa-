import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../css/Chat.css'
import db from '../firebase'
import { query, addDoc, doc, onSnapshot, collection, orderBy, serverTimestamp } from 'firebase/firestore'
import { useStateValue } from './StateProvider'

function Chat() {
  const [seed, setSeed] = useState('')
  const [input, setInput] = useState('')
  const [roomName, setRoomName] = useState('')
  const [messages, setMessages] = useState([])
  const [{user}, dispatch] = useStateValue()
  const { roomId } = useParams()

  useEffect(() => {
    if (roomId) {
      const docRef = doc(db, "rooms", roomId)
      const unsub = onSnapshot(docRef, (doc) => {
        setRoomName(doc.data().name)
      })

      const messagesQuery = query(collection(docRef, "messages"), orderBy("timestamp", "asc"))
      const messageUnsub = onSnapshot(messagesQuery, (querySnapshot) => {
        setMessages(querySnapshot.docs.map((d) => 
          d.data()
        ))
      })

    }
  },[roomId])
  
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    const docRef = doc(db, "rooms", roomId)
    const messageRef = addDoc(collection(docRef, "messages"), {
      message: input,
      name: user.displayName,
      timestamp: serverTimestamp()
    })
    setInput('')
  }

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>Last seen {" "}
            {new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString()}
          </p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined/>
          </IconButton>

          <IconButton>
            <AttachFile/>
          </IconButton>

          <IconButton>
            <MoreVert/>
          </IconButton>
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message) => (
          <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
            <span className="chat_name">
              {message.name}
            </span>
              {message.message}
            <span className="chat_timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>

        ))}

      </div>

      <div className="chat_footer">
        <InsertEmoticon/>
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button 
            type="submit"
            onClick={sendMessage}
            >Send a message</button>
        </form>
        <Mic/>
      </div>
    </div>
  )
}

export default Chat