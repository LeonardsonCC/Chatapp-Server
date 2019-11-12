let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let CryptoTS = require("crypto-ts");

interface Messages {
    user_id: number,
    username: string,
    message_id: number,
    message: string,
}

interface User {
    user_id: number
    name: string,
    session: string
}

let messages:Array<Messages> = [];
let users:Array<User> = [];
let user_actual_id:number = 1;
let message_actual_id:number = 1;

// Socket Events
io.on('connection', function (socket: SocketIO.Socket) {
    let user_obj:User = {
        user_id: user_actual_id,
        name: '',
        session: CryptoTS.AES.encrypt(''+user_actual_id, "teste").toString(),
    };
    console.log(users);

    socket.on('register by token', function (session: string) {
        user_obj = users.filter(item => item.session == session)[0];
    });

    socket.on('register username', function (username: string) {
        user_obj = {
            user_id: user_actual_id,
            name: username,
            session: CryptoTS.AES.encrypt(username+user_actual_id, "teste").toString(),
        };
        user_actual_id++;

        user_obj.name = username;
        console.log(user_obj.name + ' connected');
        if (user_obj.session) {
            socket.emit('register username result', user_obj.session);
        }
        else {
            socket.emit('register username result', '');
        }

        users.push(user_obj);

        socket.broadcast.emit('new user connected');
    });

    socket.on('send new message', function (message: string) {
        
        const message_obj:Messages = {
            message: message,
            message_id: message_actual_id,
            user_id: user_obj.user_id,
            username: user_obj.name
        }
        socket.broadcast.emit('new message', message_obj);
        socket.emit('new message', message_obj);
        message_actual_id++;

    });
    
    // on disconnect
    socket.on('disconnect', function () {
        console.log(user_obj.name + ' disconnected');
    });    
});

// Run server
http.listen(3001, function () {
    console.log('server running on 127.0.0.1:3001');
});