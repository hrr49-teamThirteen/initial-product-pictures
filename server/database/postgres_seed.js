/* eslint-disable no-console */
require('dotenv').config();
const { exec } = require('child_process');
const ratingsModel = require('../models/ratingsModel');
const productsModel = require('../models/productsModel');
const photosModel = require('../models/photosModel');

function initEmptyDb() {
  return new Promise((resolve, reject) => {
    exec('psql -d fec -U taylor -W -f server/database/schemas/postgres_schema.sql', (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(error);
      return resolve(`stdout: ${stdout}`);
    });
  });
}

function loadProductsCSV() {
  return new Promise((resolve, reject) => {
    exec(`psql -d fec -c "
    COPY products(id, colorid, price, questions, title)
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

function loadUsersCSV() {
  return new Promise((resolve, reject) => {
    exec(`psql -d fec -c "
    COPY users(id, username)
    FROM '${__dirname}/data/users.csv'
    DELIMITER ','CSV HEADER;"`,
    (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(error);
      return resolve(`stdout: ${stdout}`);
    });
  });
}

function loadRatingsCSV() {
  return new Promise((resolve, reject) => {
    exec(`psql -d fec -c "
    COPY ratings(id, user_id, product_id, rating_given)
    FROM '${__dirname}/data/ratings.csv'
    DELIMITER ','CSV HEADER;"`,
    (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(error);
      return resolve(`stdout: ${stdout}`);
    });
  });
}

// SELECT setval('products_id_seq', max(id)) FROM products;
// SELECT setval('users_id_seq', max(id)) FROM users;
// SELECT setval('ratings_id_seq', max(id)) FROM ratings;
// SELECT setval('photos_id_seq', max(id)) FROM photos;
// initEmptyDb()
loadProductsCSV()
  .then(() => loadPotosCSV())
  .then(() => loadUsersCSV())
  .then(() => loadRatingsCSV())
  .then(() => ratingsModel.updateAutoIdUsers())
  .then(() => photosModel.updateAutoIdPhotos())
  .then(() => productsModel.updateAutoIdProducts())
  .then(() => (console.log('Success')))
  .catch((err) => {
    console.log(`${err ? err.message : 'error initemptydb'}`);
  });

// console.log('Uncomment in postgres_seed.js to execute');


psql -d fec "COPY products(id, colorid, price, questions, title) FROM 'home/ubuntu/initial-product-pictures/server/database/data/products.csv' DELIMITER ','CSV HEADER