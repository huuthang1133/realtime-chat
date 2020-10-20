import React, { useState } from 'react';
import '../resources/Home.css'
import { Link } from 'react-router-dom';

const Home = () => {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')

    const onChange1 = (e) => {
        setName(e.target.value)
    }

    const onChange2 = (e) => {
        setRoom(e.target.value)
    }

    return (
		<div className="join-container">
			<header className="join-header">
				<h1><i className="fas fa-smile"></i> ChatCord</h1>
			</header>
			<main className="join-main">
				<form action="chat.html">
					<div className="form-control">
						<label for="username">Username</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="Enter username..."
                            required
                            onChange={onChange1}
						/>
					</div>
					<div className="form-control">
						<label for="room">Room</label>
						<input
							type="text"
							name="room"
							id="room"
							placeholder="Enter room..."
                            required
                            onChange={onChange2}
						/>
					</div>
                    <Link 
                        onClick={e => (!name || !room) ? e.preventDefault() : null}
                        to={`/chat?name=${name}&room=${room}`}>
					    <button type="submit" className="btn">Join Chat</button>
                    </Link>                    
				</form>
			</main>
		</div>        
    )
}

export default Home;