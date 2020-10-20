import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { Messages, UsersBar } from './'
import InputEmoji from "react-input-emoji";

const ENDPOINT = 'https://realtim-chat-project.herokuapp.com/';
let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])

    const sendMessage = (message) => {
        socket.emit('sendMessage', message, ()=> {
            setMessage('')
        })
    }

    useEffect(()=> {
        socket = io(ENDPOINT);
        const {name, room} = queryString.parse(location.search);        
        setName(name);
        setRoom(room);
        socket.emit('join', { name, room }, ()=>{})
        socket.on('roomData', (data) => {
            setUsers(data.users)
        })
        return () => {
            socket.emit('disconnect');

            socket.off();
        }            
    }, [location.search])

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message])
        })
    }, [messages])
    return (
        <div className="chat-container">
            <header className="chat-header">
            <h1><i className="fas fa-smile"></i> ChatCord</h1>
            <a href="/" className="btn">Leave Room</a>
            </header>
            <main className="chat-main">
            <div className="chat-sidebar">
                <h3><i className="fas fa-comments"></i> Room Name:</h3>
                <h2 id="room-name">{room}</h2>
                <h3><i className="fas fa-users"></i> Users Online</h3>
                <UsersBar users={users} />
            </div>
            <Messages messages={messages} name={name}/>
            </main>
            <div className="chat-form-container">
                <InputEmoji
                    id="chat-form"
                    value={message}
                    onChange={setMessage}
                    onEnter={sendMessage}
                    cleanOnEnter
                    placeholder="Type a message"
                >                   
                </InputEmoji>                 
            </div>
        </div>
    )
}

export default Chat;