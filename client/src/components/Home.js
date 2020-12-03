import React, { useState } from 'react';
import '../resources/Home.css'
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [name, setName] = useState('')
	const [room, setRoom] = useState('')
	
	const notifyName = () => toast.error('Please Fill Name !')
	const notifyRoom = () => toast.error('Please Fill Room !')
	const notifySuccess = () => toast.success('Join Room Successfully !')

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeRoom = (e) => {
		setRoom(e.target.value)
	}
	
	const handleJoinChat = (e)=> {
		if(!room.trim() || !name.trim()){
			e.preventDefault();
			if(!room.trim()){
				notifyRoom()
			}
			if(!name.trim()){
				notifyName()
			}			
		}
		else {
			notifySuccess()
			return null;
		}
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
                            onChange={onChangeName}
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
                            onChange={onChangeRoom}
						/>
					</div>
                    <Link 
						onClick={handleJoinChat}
						// {e => (!name || !room) ? e.preventDefault() : null}
                        to={`/chat?name=${name}&room=${room}`}>
					    <button type="submit" className="btn">Join Chat</button>
                    </Link>                    
				</form>
			</main>
		</div>        
    )
}

export default Home;