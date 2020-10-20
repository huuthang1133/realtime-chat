import React from 'react';

import '../resources/Message.css'

const Message = ({message, name}) => {
    let isSentByCurrentUser = false;
    name = name.trim().toLowerCase();
    if(message.username === name){
        isSentByCurrentUser = true        
    }
    return (
        isSentByCurrentUser ? (
            <div className="chat-messages messageContainer justifyEnd"> 
                <div className="message messageBox backgroundBlue">
                    <p className="meta colorWhite" >{message.username} <span>{message.time}</span></p>
                    <p className="text messageText colorWhite">{message.text}</p>
                </div>            
            </div>
        ) : (
            <div className="chat-messages messageContainer justifyStart"> 
                <div className="message messageBox backgroundLight">
                    <p className="meta colorDark" >{message.username} <span>{message.time}</span></p>
                    <p className="text messageText colorDark">{message.text}</p>
                </div>            
            </div>            
        )
    )
}

export default Message