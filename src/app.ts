let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
// let faker = require('faker');

interface Messages {
    user_id: number
    message_id: number,
    message: string,
}

interface User {
    user_id: number
    name: string,
}

let messages:Array<Messages> = [];
let users:Array<User> = [];
let user_actual_id:number = 1;
let message_actual_id:number = 1;

// Socket Events
io.on('connection', function (socket: SocketIO.Socket) {
    // Username
    let username = 'Teste';
    const user_obj:User = {
        user_id: user_actual_id,
        name: username
    };
    user_actual_id++;

    socket.emit('take all messages', messages);
    socket.emit('take your name', username);

    users.push(user_obj);

    socket.on('send message', function (msg: string) {
        messages.push({ 
            user_id: user_obj.user_id,
            message_id: message_actual_id,
            message: msg
        });
        message_actual_id++;

        socket.emit('take all messages', messages);
        socket.broadcast.emit('take all messages', messages);
    });
    
    socket.on('disconnect', function () {
        console.log(username + ' disconnected');
        users = users.filter(item => item.user_id !== user_obj.user_id);
    });    
});


http.listen(3000, function () {
    console.log('server running on 127.0.0.1:3000');
});