/* eslint-disable no-console */
const { exec } = require('child_process');
const { productWriter, photoWriter } = require('./csv_writers');

function initEmptyDb() {
  return new Promise((resolve, reject) => {
    exec('psql fec -f server/database/schemas/postgres_schema.sql', (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(error);
      return resolve(`stdout: ${stdout}`);
    });
  });
}

function loadProductsCSV() {
  return new Promise((resolve, reject) => {
    exec(`psql -d fec -c "
    COPY products(id, colorid, price, reviewscore, questions, title)
    FROM '${__dirname}/data/products.csv'
    DELIMITER ','CSV HEADER;"`,
    (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(error);
      return resolve(`stdout: ${stdout}`);
    });
  });
}

function loadPotosCSV() {
  return new Promise((resolve, reject) => {
    exec(`psql -d fec -c "
    COPY photos(id, product_id, photourl, colorid)
    FROM '${__dirname}/data/photos.csv'
    DELIMITER ','CSV HEADER;"`,
    (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(error);
      return resolve(`stdout: ${stdout}`);
    });
  });
}

initEmptyDb()
  .then(() => productWriter())
  .then(() => photoWriter())
  .then(() => loadProductsCSV())
  .then(() => loadPotosCSV())
  .then(() => (console.log('Success')))
  .catch((err) => {
    console.log(err.message || 'error initemptydb');
  });
