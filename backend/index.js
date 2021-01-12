require('dotenv'). config();
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router')
const { addUser, getUser, removeUser, getUsersInRoom } = require('./controllers/users');
const  formatMessage  = require('./controllers/message.js')

const PORT = process.env.PORT || 5000;

const app = express();

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', socket => {
    socket.on('join', ({name, room}, cb) => {
        const { error, user } = addUser({id: socket.id, name, room});
        if(error) return cb(error);
        socket.emit('message', formatMessage('admin', `Welcome to ${user.room}'s room !!!`))
        socket.broadcast.to(user.room).emit('message', formatMessage('admin', `${user.name}, has joined!`))
        socket.join(user.room)
        io.to(user.room).emit('roomData', {room: user.room, users: getUsersInRoom(user.room)})
    })
    socket.on('sendMessage', (message, cb) =>{
        const user = getUser(socket.id)
        io.to(user.room).emit('message', formatMessage( user.name, message))
        cb();
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
        if(user){
            io.to(user.room).emit('message', formatMessage( user.name, `${user.name} has left!!!`))
        }
    })
})

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`))