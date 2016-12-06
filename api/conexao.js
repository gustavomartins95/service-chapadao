"use strict"

const mysql = require('mysql');

const connection = mysql.createConnection ({
    database:  'autopecas',
    host:      'localhost',
    user:      'root',
    password:  ''
});

connection.connect(function(err) {
    if (err) {
        console.error("Error connecting: " + err.stack);
        return;
    }
    console.log("Connected");
});

module.exports = connection;