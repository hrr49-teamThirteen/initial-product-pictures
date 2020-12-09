/* eslint-disable no-console */
const { exec } = require('child_process');
const productsModel = require('../models/productsModel');
const photosModel = require('../models/photosModel');
const ratingsModel = require('../models/ratingsModel');

const user = 'root';
const pass = 'cheeze';

function initEmptyDb() {
  return new Promise((resolve, reject) => {
    exec(`mysql -u ${user} < server/database/schemas/schema.sql -p${pass}`, (error, stdout, stderr) => {
      if (error) return reject(error);
      if (stderr) return reject(error);
      return resolve(`stdout: ${stdout}`);
    });
  });
}

initEmptyDb()
  .then(() => productsModel.loadCSVproducts())
  .then(() => photosModel.loadCSVphotos())
  .then(() => ratingsModel.loadCSVUsers())
  .then(() => ratingsModel.loadCSVRatings())
  .then(() => (console.log('Success')))
  .catch((err) => {
    console.log('Error', err.message);
  });
