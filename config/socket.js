const app = require('./express');
const socket = require('socket.io');
const http = require('http');

const server = http.createServer(app);

const io = socket.listen(server);
module.exports = { io, server };