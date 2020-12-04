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
  getProductById(id) {
    return new Promise((resolve, reject) => {
      db.connection.query('SELECT * FROM products WHERE id=?;', [id], (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  },
  updateProduct(data, id) {
    return new Promise((resolve, reject) => {
      const values = [
        data.colorid,
        data.price,
        data.reviewscore,
        data.questions,
        data.title,
        id,
      ];
      const statement = `
        UPDATE products
        SET colorID=?, price=?, reviewscore=?, questions=?, title="?"
        WHERE id=?;`;
      db.connection.query(statement, values, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      const statement = 'DELETE FROM products WHERE id=?;';
      db.connection.query(statement, [id], (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  },
  loadCSVproducts() {
    const path = `${__dirname}/../database/data/products.csv`;
    return new Promise((resolve, reject) => {
      const statement = `
        LOAD DATA INFILE ?
        INTO TABLE products
        FIELDS TERMINATED BY ','
        ENCLOSED BY '"'
        LINES TERMINATED BY '\n'
        IGNORE 1 ROWS
      `;
      db.connection.query(statement, [path], (err, results) => {
        console.log('results', results);
        console.log('err', err);
        if (err) return reject(err);
        return resolve(results);
      });
    });
  },
};
