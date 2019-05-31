const config = require('./config/config');
const { server } = require('./config/socket');
const io = require('socket.io-client');

const connectToIO = () => {
    const socket = io('http://localhost:4040');
    socket.on('STATUS_UPDATED', (data) => {
        console.log('Update Data', data)
    })
}
connectToIO();

const app = server.listen(1010);
module.exports = app;