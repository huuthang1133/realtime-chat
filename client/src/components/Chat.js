import React, { useState, useEffect } from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import { Link } from 'react-router-dom';
import { Messages, UsersBar } from './';
import Picker from "emoji-picker-react";
import TextareaAutosize from 'react-textarea-autosize';
import OutsideClickHandler from 'react-outside-click-handler';
import '../resources/Home.css';

const ENDPOINT = 'https://realtim-chat-project.herokuapp.com/';
let socket;

const Chat = ({location}) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    const [users, setUsers] = useState([])
    const [show, setShow] = useState(false)

    const handleEmoji = () => {
        setShow(!show)
    }

    const handleOutSideClick = () => {
        if(show){
            setShow(!show)
        }
    }

    const onChangeMessage = (e) => {
        setMessage(e.target.value)
    }

    const onEmojiClick = (event, emojiObject) => {
        setMessage(message + emojiObject.emoji)
    }

    const sendMessage = (e) => {     
        if(e.keyCode === 13 && (e.shiftKey || e.altKey)){
            setMessage(message + '\r\n');
        }
        if(e.keyCode === 13 && (!e.shiftKey && !e.altKey)){
            socket.emit('sendMessage', message, ()=> {
                setMessage('')
            })
        }
    }

    const clickSendMessage = (e) => {
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
            console.log(message, message.text)
            setMessages([...messages, message])
        })
    }, [messages])

    console.log(show)
    return (
        <div className="chat-container">
            <header className="chat-header">
            <h1><i className="fas fa-smile"></i> ChatCord</h1>
            <Link to='/' className="btn">Leave Room</Link>
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
            <div id="chat-form">
                <TextareaAutosize
                    className='text-message'
                    style={{height: 'auto'}}
                    value={message}
                    onChange={onChangeMessage}
                    onKeyUp={sendMessage}             
                    id="msg"
                    type="text"
                    placeholder="Enter Message"
                    required
                    autoComplete="off"
                />
                <OutsideClickHandler
                    onOutsideClick={handleOutSideClick}
                >
                    {show ? 
                    <div className='picker' style={{ display: 'block'}}>
                        <Picker onEmojiClick={onEmojiClick}/>        
                    </div> :
                    <div className='picker'>
                        <Picker onEmojiClick={onEmojiClick}/>        
                    </div> 
                    }
                    <button onClick={handleEmoji}>
                        {String.fromCodePoint(0x1f60a)}
                    </button>                    
                </OutsideClickHandler>                
                <button 
                    className="btn"
                    onClick={clickSendMessage}
                ><i class="fas fa-paper-plane"></i> Send</button>    
            </div>            
            </div>
        </div>
    )
}

export default Chat;