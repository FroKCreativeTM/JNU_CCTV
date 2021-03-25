const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function (socket) {
    socket.on('data', function (data) {
        // listen on client emit 'data'
        // and receive image in real time
        var frame = Buffer.from(data, 'base64').toString();
        // emit to socket
        io.emit('image', frame);
    })
});

server.listen(3000, function () {
    console.log('listening on :3000');
});