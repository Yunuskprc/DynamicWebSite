const mysql = require('mysql');
const config = require('./config.js');

let connection = mysql.createConnection(config.db);

connection.connect(function(err){
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log("MySQL e bağlandı");
})

module.exports = connection;