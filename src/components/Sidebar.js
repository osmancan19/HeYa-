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
          <SearchOutlined/>
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
