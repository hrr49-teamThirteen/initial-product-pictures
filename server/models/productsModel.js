/* eslint-disable no-console */
// const db = require('../database/index.js'); // mysql
const db = require('../database/postgres_con.js'); // postgres

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
  writeProduct(colorid, price, questions, title) {
    return new Promise((resolve, reject) => {
      db.connection.query('INSERT INTO products (colorid, price, questions, title) VALUES ($1,$2,$3,$4);', [colorid, price, questions, title], (err) => {
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
      db.connection.query('SELECT * FROM products WHERE id=$1;', [id], (err, results) => {
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
        SET colorid=$1, price=$2, reviewscore=$3, questions=$4, title="$5"
        WHERE id=$6;`;
      db.connection.query(statement, values, (err, result) => {
        if (err) return reject(err);
        return resolve(result);
      });
    });
  },
  deleteProduct(id) {
    return new Promise((resolve, reject) => {
      const statement = 'DELETE FROM products WHERE id=$1;';
      db.connection.query(statement, [id], (err, results) => {
        if (err) return reject(err);
        return resolve(results);
      });
    });
  },

  // postgres update autoincrementing id's
  updateAutoIdProducts() {
    const statement = 'SELECT setval(\'products_id_seq\', max(id)) FROM products;';
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
  // loadCSVproducts() {
  //   const path = `${__dirname}/../database/data/products.csv`;
  //   return new Promise((resolve, reject) => {
  //     const statement = `
  //       LOAD DATA INFILE ?
  //       INTO TABLE products
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
