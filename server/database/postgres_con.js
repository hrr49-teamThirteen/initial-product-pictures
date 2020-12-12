const { Pool } = require('pg');

// connection information is provided in env variables.
const pool = new Pool();

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports.connection = pool;

// const client = new Client({
//   host: 'localhost',
//   user: process.env.PG_USERNAME,
//   password: process.env.PG_PASSWORD,
//   database: process.env.PG_DATABASE,
// });

// client.connect((err) => {
//   if (err) {
//     console.error('postgres connection error', err);
//   } else {
//     console.log('connected');
//   }
// });

// module.exports.connection = client;
