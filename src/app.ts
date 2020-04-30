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
    let user_return = users.returnLogin(session);
    if (user_return) {
      actual_user = user_return;
      socket.emit(events.REGISTER_BY_TOKEN_RESULT, true);
    } else {
      socket.emit(events.REGISTER_BY_TOKEN_RESULT, false);
    }
  });

  socket.on(events.REGISTER_USERNAME, function (username: string) {
    actual_user = users.userLogin({
      username,
      socket,
    });
    socket.emit(events.REGISTER_USERNAME_RESULT, actual_user.session);
    socket.broadcast.emit(events.NEW_USER_CONNECTED);
  });
  socket.on(events.SEND_NEW_MESSAGE, function (message: string) {
    if (actual_user) {
      const new_message = messages.sendNewMessage(actual_user, message);
      socket.emit(events.NEW_MESSAGE, new_message);
      socket.broadcast.emit(events.NEW_MESSAGE, new_message);
    } else {
      console.log('User not logged tried to send a message');
    }
  });

  // on disconnect
  socket.on(events.DISCONNECTED, function () {
    if (users.UsersList !== undefined) {
        try {
          let user_disconnected = users.UsersList.filter(item => item.socket == socket)[0];

          console.log(`${user_disconnected.username} disconnect`);

          users.UsersList = users.UsersList.filter(item => item != user_disconnected);
        }
        catch (e) {
          console.log(e);
        }
    }
  });
});

// Run server
server.listen(3001, function () {
  console.log('server running on 127.0.0.1:3001');
});
