let db = require('./index.js');

module.exports = {
  getAllProducts: function() {
    return new Promise ((resolve, reject) =>{
      db.connection.query('SELECT * FROM products', (err, results, fields) => {
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
  getAllPhotos: function() {
    return new Promise ((resolve, reject) => {
      db.connection.query('Select * FROM photos', (err, results, fields) => {
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
  writeProduct: function(colorID, price, reviewscore, questions, title) {
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
  writePhoto: function(photoURL, colorID) {
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
  }
};

//INSERT INTO products (colorID, price, reviewscore, questions, title) VALUES (1, 99.00, 4, 91, "Keurig K-Cup Coffe thingy")