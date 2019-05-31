const config = require('./config/config');
const { server, io } = require('./config/socket');

const mysql = require('mysql');
const MySQLEvents = require('@rodrigogs/mysql-events');

let connection, eventInstance;
const watchDB = async(socket) => {
    if (!connection && !eventInstance) {
        connection = mysql.createConnection({
            host: config.mysql.host,
            user: config.mysql.user,
            password: config.mysql.password,
            database: config.mysql.db
        });
        eventInstance = new MySQLEvents(connection, {
            startAtEnd: true,
            serverId: 5,
            excludedSchema: {
                mysql: true,
            }
        })
    }

    await eventInstance.start();

    eventInstance.removeTrigger({
        name: 'RECEIVE UPDATE EVENT',
        expression: 'ccc.jobs',
        statement: MySQLEvents.STATEMENTS.UPDATE,
    });

    eventInstance.addTrigger({
        name: 'RECEIVE UPDATE EVENT',
        expression: 'ccc.jobs',
        statement: MySQLEvents.STATEMENTS.UPDATE,
        onEvent: (event) => {
            const after = event.affectedRows[0].after;
            if ([0, 1].indexOf(+after.status) !== -1) {
                socket.emit('STATUS_UPDATED', after);
                console.log('EMIT', after);
            }
        },
    });

    eventInstance.on(MySQLEvents.EVENTS.CONNECTION_ERROR, console.error);
}

io.sockets.on('connection', function(client) {
    console.log("New Connection !");
    watchDB(client).then(() => console.log('Watching DB...')).catch(console.error);
});

const app = server.listen(config.port, () => {
    console.info(`Server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
});

module.exports = app;