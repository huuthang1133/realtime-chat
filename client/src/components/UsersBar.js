import React from 'react';

import '../resources/Home.css'

const UsersBar = ({users}) => {
    return (
        <ul id="users">
            {users.map((user,i) => <li key={i}>{user.name}</li>)}
        </ul>
    )
}

export default UsersBar;