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
  writePhoto(photoURL, colorID, productID) {
    return new Promise((resolve, reject) => {
      db.connection.query(`INSERT INTO photos (photoURL, colorID, product_id) VALUES ('${photoURL}', '${colorID}', ${productID})`, (err) => {
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
  getPhotoById(id) {
    return new Promise((resolve, reject) => {
      db.connection.query('SELECT * FROM photos WHERE id=?;', [id], (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  },
  getPhotosForProduct(id) {
    return new Promise((resolve, reject) => {
      db.connection.query('SELECT * FROM photos WHERE product_id=?;', [id], (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  },
  updatePhoto(data, id) {
    return new Promise((resolve, reject) => {
      const values = [
        data.product_id,
        data.photo_url,
        data.color_id,
        id,
      ];
      const statement = `
        UPDATE photos
        SET product_id=?, photoURL=?, colorID=?
        WHERE id=?;
        `;
      db.connection.query(statement, values, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
  deletePhoto(id) {
    return new Promise((resolve, reject) => {
      console.log('here');
      const statement = 'DELETE FROM photos WHERE id=?;';
      db.connection.query(statement, [id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
};

// id INT NOT NULL AUTO_INCREMENT,
// product_id INT NOT NULL,
// photoURL VARCHAR(255),
// colorID INT NOT NULL,
// PRIMARY KEY (id)
