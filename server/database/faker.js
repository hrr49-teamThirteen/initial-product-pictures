/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
// const db = require('index.js');
const faker = require('faker');
// const models = require('./models.js');
const productsModel = require('../models/productsModel');
const photosModel = require('../models/photosModel');
const fs = require('fs');

function makeCSV(data, addColNames = true) {
  let childList;
  let lines = [];
  const colKeys = Object.keys(data)
    .filter((k) => {
      if (Array.isArray(data[k])) {
        childList = data[k];
        return false;
      }
      return true;
    });
  if (addColNames) lines.push(colKeys.join(','));
  lines.push(colKeys.map((k) => data[k]).join(','));
  childList.forEach((child) => { lines = lines.concat(makeCSV(child, false)); });
  return lines.join('\n');
}

// const products = {
//   {}
//   "colorID": 0,
//   "price": 50.00,
//   "reviewscore": 4.00,
//   "questions": 20,
//   "title": "test product obj",
// };
// id INT NOT NULL AUTO_INCREMENT,
// colorID INT NOT NULL,
// price DECIMAL(10, 2) NOT NULL,
// reviewscore DECIMAL(10, 2) NOT NULL,
// questions INT NOT NULL,
// title VARCHAR(255),
// PRIMARY KEY (id)

async function seedProducts() {
  const results = [];
  for (let i = 1; i <= 100; i += 1) {
    const result = await productsModel.writeProduct(
      faker.random.number({ min: 0, max: 1 }),
      faker.commerce.price(),
      faker.random.number({ min: 1, max: 5 }),
      faker.random.number({ min: 1, max: 100 }),
      faker.commerce.productName(),
    );
    results.push(result);
  }
  return results;
}

async function seedPhotos() {
  const results = [];
  for (let k = 1; k <= 1000; k += 1) {
    const result = await photosModel.writePhoto(
      faker.image.imageUrl(),
      faker.random.number({ min: 1, max: 2 }),
      ((k % 100) + 1),
    );
    results.push(result);
  }
  return results;
}

seedProducts()
  .then(() => seedPhotos())
  .catch((error) => {
    console.log('error seeding', error.message);
  });
