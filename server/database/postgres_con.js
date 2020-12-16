const { Pool } = require('pg');

// connection information is provided in env variables.
const pool = new Pool();

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports.connection = pool;
