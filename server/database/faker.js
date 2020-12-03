/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
// const db = require('index.js');
const faker = require('faker');
// const models = require('./models.js');
const productsModel = require('../models/productsModel');
const photosModel = require('../models/photosModel');

async function seedProducts() {
  const results = [];
  for (let i = 1; i <= 100; i += 1) {
    const result = await productsModel.writeProduct(
      faker.random.number({ min: 1, max: 2 }),
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
    let productID = k % 100;
    if (productID === 0) productID += 1;

    const result = await photosModel.writePhoto(
      faker.image.imageUrl(),
      faker.random.number({ min: 1, max: 2 }),
      productID,
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
