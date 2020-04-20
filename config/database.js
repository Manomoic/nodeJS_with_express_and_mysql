'use strict';

const MYSQL = require('mysql');
require('dotenv').config();

const pool = MYSQL.createPool({

    connectionLimit: 10,
    host: process.env.MYSQL_HOST, // placeholder for your db host
    user: process.env.MYSQL_USER, // placeholder for your db user
    password: process.env.MYSQL_PASS, // placeholder for your db password
    database: process.env.MYSQL_DB_NAME // placeholder for your db name

});

pool.getConnection((error, connection) => {

    if (error) {
        if (error.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (error.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (error.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }

    if (connection) connection.release();

    return;
});

module.exports = pool;
