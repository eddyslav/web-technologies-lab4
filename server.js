const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const targetPort = 3000;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('new-message', (msg) => {
    io.emit('new-message', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(targetPort, () => {
  console.log(`Server started on ${targetPort} port`);
});
