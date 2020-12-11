/* eslint-disable no-console */
// const db = require('../database/index.js'); // mysql
const db = require('../database/postgres_con.js'); // postgres

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
  writePhoto(photourl, colorid, productID) {
    return new Promise((resolve, reject) => {
      db.connection.query(`INSERT INTO photos (photourl, colorid, product_id) VALUES ('${photourl}', '${colorid}', ${productID})`, (err) => {
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
      db.connection.query('SELECT * FROM photos WHERE colorid=1', (err, results) => {
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
      db.connection.query('SELECT * FROM photos WHERE colorid=0', (err, results) => {
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
      db.connection.query('SELECT * FROM photos WHERE id=$1;', [id], (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  },
  getPhotosForProduct(id) {
    return new Promise((resolve, reject) => {
      db.connection.query('SELECT * FROM photos WHERE product_id=$1;', [id], (err, results) => {
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
        SET product_id=$1, photourl=$2, colorid=$3
        WHERE id=$4;
        `;
      db.connection.query(statement, values, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
  deletePhoto(id) {
    return new Promise((resolve, reject) => {
      const statement = 'DELETE FROM photos WHERE id=$1;';
      db.connection.query(statement, [id], (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },

  // postgres update autoincrementing id's
  updateAutoIdPhotos() {
    const statement = 'SELECT setval(\'photos_id_seq\', max(id)) FROM photos;';
    return new Promise((resolve, reject) => {
      db.connection.query(statement, (err, results) => {
        console.log('results', results);
        console.log('err', err);
        if (err) return reject(err);
        return resolve(results);
      });
    });
  },

  // mysql csv loader method
  // loadCSVphotos() {
  //   const path = `${__dirname}/../database/data/photos.csv`;
  //   return new Promise((resolve, reject) => {
  //     const statement = `
  //       LOAD DATA INFILE ?
  //       INTO TABLE photos
  //       FIELDS TERMINATED BY ','
  //       ENCLOSED BY '"'
  //       LINES TERMINATED BY '\n'
  //       IGNORE 1 ROWS
  //     `;
  //     db.connection.query(statement, [path], (err, results) => {
  //       console.log('results', results);
  //       console.log('err', err);
  //       if (err) return reject(err);
  //       return resolve(results);
  //     });
  //   });
  // },
};
