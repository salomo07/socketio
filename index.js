const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{cors: {
    origin: "*"}});
var clients = 0;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  clients++;
  console.log(socket.id+' user connected');
  socket.on('disconnect', () => {
    clients--;
    console.log(socket.id+' user disconnected');
  });
});
app.post('/inboundmsg', (req, res) => {
	// console.log(io.sockets);
	io.sockets.emit(req.body.namaevent,req.body);
	res.send('<h6>Message already send</h6>');
});
app.post('/broadcast', (req, res) => {
  io.sockets.emit("broadcast",req.body);
  console.log('Broadcast : ',req.body)
  res.send('<h6>Message already broadcast</h6>');
});
const PORT =process.env.PORT||3000;
server.listen(PORT, () => {
  console.log('listening on *:3000');
});