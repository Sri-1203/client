import React, { useState, useEffect } from "react";
import Qs from 'query-string';
import io from "socket.io-client";

import './Chat.css';
import TextContainer from './TextContainer/TextContainer.js';
import Messages from './Messages/Messages.js';
import InfoBar from './InfoBar/InfoBar.js';
import Input from './Input/Input.js';

const ENDPOINT = 'https://medic-chat.onrender.com';
let socket;


const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
  
    useEffect(() => {
        console.log(location);
        const { name, room } = Qs.parse(window.location.search, {
            ignoreQueryPrefix: true,
          });
        console.log({name,room});
      socket = io(ENDPOINT);
  
      setRoom(room);
      setName(name)
  
      socket.emit('join', { name, room }, (error) => {
        if(error) {
          alert(error);
        }
      });

      return ()=>{
        socket.emit("disconnect");
        socket.off(); 
      }
    }, [ENDPOINT, location]);

    useEffect(() => {
        socket.on('message', message => {
          setMessages(messages => [ ...messages, message ]);
        });
        
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
    }, []);
    
      const sendMessage = (event) => {
        event.preventDefault();
    
        if(message) {
          socket.emit('sendMessage', message, () => setMessage(''));
        }
      }
    console.log(message,messages);
      return (
        <div className="outerContainer"><TextContainer users={users}/>
          <div className="container">
            <InfoBar room={room} />
            <Messages messages={messages} name={name} />
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />

            </div>
            
        </div>
      );
    }

export default Chat;