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
    let username = 'Não definido!';
    const user_obj:User = {
        user_id: user_actual_id,
        name: username
    };
    user_actual_id++;
    socket.on('register username', function (username: string) {
        user_obj.name = username;
        console.log(user_obj.name + ' connected');

        socket.broadcast.emit('new user connected')
    });
    
    socket.on('disconnect', function () {
        users = users.filter(item => item.user_id !== user_obj.user_id);
        console.log(username + ' disconnected');
    });    
});


http.listen(3001, function () {
    console.log('server running on 127.0.0.1:3001');
});