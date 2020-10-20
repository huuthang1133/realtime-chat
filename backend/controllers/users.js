const users = [];

const addUser = ({id, name, room}) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find(user => user.room === room && user.name === name)
    if(existingUser){
        return { error: 'User is existing'}
    }

    const user = { id, name, room};

    users.push(user);

    return { user };
}

const getUser = (id) => users.find(user => user.id === id)

const getUsersInRoom = (room) => users.filter(user => room=== user.room)

const removeUser = (id) => {
    const index = users.findIndex(user => user.id === id)
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

module.exports = { addUser, getUser, removeUser, getUsersInRoom }