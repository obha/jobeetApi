const app = require('./app');
const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    serveClient:false,
    pingInterval: 10000,
    pingTimeout: 5000,
    cookie: false
});

server.listen(3000);