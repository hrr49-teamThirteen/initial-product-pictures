/* eslint-disable no-console */
const { exec } = require('child_process');
const productsModel = require('../models/productsModel');
const photosModel = require('../models/photosModel');
const { productWriter, photoWriter } = require('./csv_writers');

const user = 'root';
const pass = 'cheeze';

function initEmptyDb() {
  return new Promise((resolve, reject) => {
    exec(`mysql -u ${user} < server/database/schema.sql -p${pass}`, (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(error);
      return resolve(`stdout: ${stdout}`);
    });
  });
}

initEmptyDb()
  .then(() => productWriter())
  .then(() => photoWriter())
  .then(() => productsModel.loadCSVproducts())
  .then(() => photosModel.loadCSVphotos())
  .then(() => (console.log('Success')))
  .catch((err) => {
    console.log('Error', err.message);
  });
