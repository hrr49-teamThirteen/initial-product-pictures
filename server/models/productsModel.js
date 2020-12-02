/* eslint-disable no-console */
const db = require('../database/index.js');

module.exports = {
  getAllProducts() {
    return new Promise((resolve, reject) => {
      db.connection.query('SELECT * FROM products', (err, results) => {
        if (err) {
          console.log('Error retrieving Product Data');
          reject(err);
        } else {
          console.log('Retrieved Product Data Successfully');
          resolve(results);
        }
      });
    });
  },
  writeProduct(colorID, price, reviewscore, questions, title) {
    return new Promise((resolve, reject) => {
      db.connection.query(`INSERT INTO products (colorID, price, reviewscore, questions, title) VALUES ('${colorID}','${price}','${reviewscore}','${questions}','${title}')`, (err) => {
        if (err) {
          console.log('There was an Error writing the product info');
          reject(err);
        } else {
          console.log('Product info written to the Database');
          resolve();
        }
      });
    });
  },
};
