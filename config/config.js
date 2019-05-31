// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();
envVars = process.env;
const config = {
    env: envVars.NODE_ENV,
    port: envVars.PORT,
    mysql: {
        host: envVars.MYSQL_HOST,
        user: envVars.MYSQL_USER,
        password: envVars.MYSQL_PASSWORD,
        db: envVars.MYSQL_DB
    }
};

module.exports = config;