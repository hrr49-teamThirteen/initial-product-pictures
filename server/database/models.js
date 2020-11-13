let db = require('./index.js');

module.exports = {
  getAll: function() {
    return new Promise ((resolve, reject) =>{
      db.connection.query('SELECT * FROM products', (err, results, fields) => {
        if (err) {
          console.log('Error retrieving Data');
          reject(err);
        } else {
          console.log('Retrieved Data Successfully');
          resolve(results);
        }
      });
    });
  },
  writeProduct: function(photos, colorID, price, reviewscore, questions, title) {
    return new Promise((resolve, reject) => {
      db.connection.query(`INSERT INTO products (photoID, colorID, price, reviewscore, questions, title) VALUES ('${photos}','${colorID}','${price}','${reviewscore}','${questions}','${title}')`, (err) => {
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
  writePhoto: function(photoURL, colorID) {
    return new Promise((resolve, reject) => {
      dq.connection.query(`INSERT INTO photos (photoURL, colorID) VALUES ('${photoURL}', '${colorID}')`, (err) => {
        if (err) {
          console.log('There was an Error writing the photo info');
          reject(err);
        } else {
          console.log('Photo Data Successfully written');
          resolve();
        }
      });
    });
  }
};