import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material'
import { Avatar, IconButton } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../css/Chat.css'
import db from '../firebase'
import { query, addDoc, doc, onSnapshot, collection, orderBy, serverTimestamp } from 'firebase/firestore'
import { useStateValue } from './StateProvider'
import SendIcon from '@mui/icons-material/Send';

function formatDate(d,f)
{
  var date = new Date(d);

  if(isNaN(date) && f == "header")
    return "No Message Yet";
  else{
    var dd = date.getDate(); 
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear(); 
    if(dd<10){dd='0'+dd} ;
    if(mm<10){mm='0'+mm};
    var hour = date.getHours();
    var min = date.getMinutes();
    if(hour<10){hour='0'+hour} 
    if(min<10){min='0'+min};
    if(f=="header")
      return d ="Last Message " + hour+':'+min+' - '+dd+'.'+mm+'.'+yyyy;
    else
      return d = hour+':'+min+' - '+dd+'.'+mm+'.'+yyyy;
  }
}
function ChangeName(name){
  var names = name.split(' ');
  var firstName = names[0];
  var lastName = names[1];
  firstName = firstName.substr(0,1).toUpperCase()+firstName.substr(1,firstName.length);  
  lastName = lastName.substr(0,1).toUpperCase()+lastName.substr(1,lastName.length); 
  return firstName + " " + lastName;
}
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
    if(input === '')
    {
      alert("Type a message.");
      return;
    }
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
          <p>
            {formatDate(new Date(messages[messages.length - 1]?.timestamp?.toDate()).toUTCString(),"header")}
          </p>
        </div>

        <div className="chat_headerRight">
        <div className="sidebar_searchContainer">
          <IconButton>
            <SearchOutlined/>          
          </IconButton>
          <input placeholder="Search Chat"
            type="text" />
        </div>
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
              {ChangeName(message.name)}
            </span>
              {message.message}
            <span className="chat_timestamp">
              {formatDate(new Date(message.timestamp?.toDate()).toUTCString(),"body")}
            </span>
          </p>
          
        ))}

      </div>

      <div className="chat_footer">
        <InsertEmoticon/>
        <Mic/>
        <form>
          <input
            type="text"
            placeholder="Type a message"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
         
          <button              
            type="submit"
            onClick={sendMessage}> 
            <SendIcon/>
          </button>
        </form>
        
      </div>
    </div>
  )
}

export default Chat