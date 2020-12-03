import React, { useEffect, useRef } from 'react';
import '../resources/Home.css'
import { Message } from './' 

const Messages = ({ messages, name }) => {
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(scrollToBottom, [messages]);

    return (
            <div className="chat-messages">
                {messages.map((message, i) => 
                    <Message key={i} message={message} name={name} />        
                )}
                <div ref={messagesEndRef} />
            </div>
    )
}

export default Messages;