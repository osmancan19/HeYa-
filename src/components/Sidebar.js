import React, { useEffect, useState } from 'react'
import '../css/Sidebar.css'
import SidebarChat from './SidebarChat'
import { SearchOutlined } from '@mui/icons-material'
import ChatIcon  from '@mui/icons-material/Chat'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Avatar, IconButton } from '@mui/material'
import db from '../firebase'
import { collection, onSnapshot,  query} from '@firebase/firestore'
import { useStateValue } from './StateProvider'

function ChangeName(name){
  var names = name.split(' ');
  var firstName = names[0];
  var lastName = names[1];
  firstName = firstName.substr(0,1).toUpperCase()+firstName.substr(1,firstName.length);  
  lastName = lastName.substr(0,1).toUpperCase()+lastName.substr(1,lastName.length); 
  return firstName + " " + lastName;
}
function Sidebar() {
  const [{user}] = useStateValue()

  const [rooms, setRooms] = useState([])


  useEffect(() => {
    const q = query(collection(db, "rooms"))

    const unsub = onSnapshot(q, (querySnapshot) => {
      setRooms(querySnapshot.docs.map((d) => ({
        id: d.id, data: d.data()
      })))
    })

    return () => {
      unsub()
    }
  }, [])

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user.photoURL}/>   
        <span className ="user_name" > {ChangeName(user.displayName)}</span>
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLargeIcon/>
          </IconButton>
          <IconButton>
            <ChatIcon/>
          </IconButton>
          <IconButton>
            <MoreVertIcon/>
          </IconButton>
        </div>
      </div>


      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <IconButton>
            <SearchOutlined/>          
          </IconButton>
          <input placeholder="Search or start new chat"
            type="text" />
        </div>
      </div>

      <div className="sidebar_chats">
        <SidebarChat addNewChat/>
        {rooms.map(room => (
          <SidebarChat
            key={room.id}
            id={room.id}
            name={room.data.name} />
        ))}
      </div>

    </div>
  )
}

export default Sidebar
