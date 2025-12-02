const mysql = require('mysql2');

const connection = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'ecommerce_db'
});

module.exports = connection;
