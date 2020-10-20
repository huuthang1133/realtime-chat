import React from 'react';
import '../resources/Home.css'
import { Message } from './' 

const Messages = ({ messages, name }) => {
    return (
        <div className="chat-messages">
            {messages.map((message, i) => 
                <Message key={i} message={message} name={name} />        
        )}</div>
    )
}

export default Messages;