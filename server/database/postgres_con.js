/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  database: 'fec',
});

client.connect((err) => {
  if (err) {
    console.error('connection error');
  } else {
    console.log('connected');
  }
});

module.exports.connection = client;
