/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: 'taylor',
  database: 'fec',
});

client.connect((err) => {
  if (err) {
    console.error('postgres connection error', err);
  } else {
    console.log('connected');
  }
});

module.exports.connection = client;
