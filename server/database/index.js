let express = require('express');
let mysql = require('mysql');


let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'fec'
});

connection.connect((err) => {
  if (err) {
    console.log('Error connecting to the database:', err);
  } else {
    console.log('Successfully Connected!');
  }
});

module.exports.connection = connection;