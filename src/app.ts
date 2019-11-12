import express from 'express';
import http from 'http';
import socketio from 'socket.io';

import UserList from './Models/UserList';
import MessageList from './Models/MessageList';
import User from './Models/User';

const events = require('./SocketEvents.json');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let messages = new MessageList();
let users = new UserList();


// Socket Events
io.on(events.CONNECTION, function (socket: SocketIO.Socket) {
    let actual_user: User;
    
    socket.on(events.REGISTER_BY_TOKEN, function (session: string) {
        actual_user = users.returnLogin(session);
    });

    socket.on('register username', function (username: string) {
        actual_user = users.userLogin({
            username
        });
        socket.emit('register username result', actual_user.session);
        socket.broadcast.emit('new user connected');
    });

    socket.on('send new message', function (message: string) {
        const new_message = messages.sendNewMessage(actual_user, message);
        
        socket.broadcast.emit('new message', new_message);
        socket.emit('new message', new_message);

    });
    
    // on disconnect
    socket.on('disconnect', function () {
        console.log('user disconnected');
    });    
});

// Run server
server.listen(3001, function () {
    console.log('server running on 127.0.0.1:3001');
});