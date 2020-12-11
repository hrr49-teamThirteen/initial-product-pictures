/* eslint-disable no-console */
// const db = require('../database/index.js'); // mysql
const db = require('../database/postgres_con.js'); // postgres

module.exports = {
  getAvgRatingForProduct(id) {
    const statement = 'SELECT AVG(rating_given) AS averagerating FROM ratings WHERE product_id=$1;';
    return new Promise((resolve, reject) => {
      db.connection.query(statement, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  updateAutoIdRatings() {
    const statement = 'SELECT setval(\'ratings_id_seq\', max(id)) FROM ratings;';
    return new Promise((resolve, reject) => {
      db.connection.query(statement, (err, results) => {
        console.log('results', results);
        console.log('err', err);
        if (err) return reject(err);
        return resolve(results);
      });
    });
  },

  updateAutoIdUsers() {
    const statement = 'SELECT setval(\'useres_id_seq\', max(id)) FROM users;';
    return new Promise((resolve, reject) => {
      db.connection.query(statement, (err, results) => {
        console.log('results', results);
        console.log('err', err);
        if (err) return reject(err);
        return resolve(results);
      });
    });
  },

  // mysql csv loader
  // loadCSVUsers() {
  //   const path = `${__dirname}/../database/data/users.csv`;
  //   return new Promise((resolve, reject) => {
  //     const statement = `
  //       LOAD DATA INFILE ?
  //       INTO TABLE users
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

  // // mysql csv loader
  // loadCSVRatings() {
  //   const path = `${__dirname}/../database/data/ratings.csv`;
  //   return new Promise((resolve, reject) => {
  //     const statement = `
  //       LOAD DATA INFILE ?
  //       INTO TABLE ratings
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
