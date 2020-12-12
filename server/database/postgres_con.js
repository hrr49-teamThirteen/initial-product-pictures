/* eslint-disable no-console */
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',
  user: process.env.PG_USERNAME,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DATABASE,
});

client.connect((err) => {
  if (err) {
    console.error('postgres connection error', err);
  } else {
    console.log('connected');
  }
});

module.exports.connection = client;
