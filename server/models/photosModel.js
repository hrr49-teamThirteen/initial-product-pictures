/* eslint-disable no-console */
const db = require('../database/index.js');

module.exports = {
  getAllPhotos() {
    return new Promise((resolve, reject) => {
      db.connection.query('Select * FROM photos', (err, results) => {
        if (err) {
          console.log('Error retrieving Photo Data');
          reject(err);
        } else {
          console.log('Retrieved Photo Data Successfully');
          resolve(results);
        }
      });
    });
  },
  writePhoto(photoURL, colorID) {
    return new Promise((resolve, reject) => {
      db.connection.query(`INSERT INTO photos (photoURL, colorID) VALUES ('${photoURL}', '${colorID}')`, (err) => {
        if (err) {
          console.log('There was an Error writing the photo info');
          reject(err);
        } else {
          console.log('Photo Data Successfully written');
          resolve();
        }
      });
    });
  },
  getAllRedPhotos() {
    return new Promise((resolve, reject) => {
      db.connection.query('SELECT * FROM photos WHERE colorID=1', (err, results) => {
        if (err) {
          console.log('Error grabbing all Red Photos');
          reject(err);
        } else {
          console.log('Successfully got all Red Photos');
          resolve(results);
        }
      });
    });
  },
  getAllBlackPhotos() {
    return new Promise((resolve, reject) => {
      db.connection.query('SELECT * FROM photos WHERE colorID=0', (err, results) => {
        if (err) {
          console.log('Error grabbing all Red Photos');
          reject(err);
        } else {
          console.log('Successfully got all Red Photos');
          resolve(results);
        }
      });
    });
  },
};
