import { Avatar, IconButton } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './Chat.css';
import { AttachFile, MoreVert, SearchOutlined, InsertEmoticon, Mic } from '@material-ui/icons';
import { useParams } from 'react-router-dom';
import db from '../firebase';

function Chat() {
  const [seed, setSeed] = useState('');
  const [input, setInput] = useState('')
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000))
  }, []);

  useEffect(() => {
    if (roomId) {
      db.collection('rooms').doc(roomId)
      .onSnapshot(snapshot => (
        setRoomName(snapshot.data().name)
      ))
    }
  }, [roomId])

  const sendMessage = (e) => {
    e.preventDefault()
    console.log("Just typed: ", input);

    setInput("")
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat__headerInfo">
          <h3> {roomName} </h3>
          <p>Last seen...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        <p className={`chat__message ${true && "chat__receiver"}`}>
          <span className="chat__name"> Topp </span>
          Hello
          <span className="chat__timestamp">03:00</span>
        </p>
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
          <form>
            <input 
              value={input} 
              onChange={e => setInput(e.target.value)}
              type="text" 
              placeholder="Type a message" />
            <button 
              onClick={sendMessage} 
              type="submit">Send message</button>
          </form>
        <Mic />
      </div>
    </div>
  )
}

export default Chat
