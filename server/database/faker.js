// const db = require('index.js');
const faker = require('faker');
// const models = require('./models.js');
const productsModel = require('../models/productsModel');
const photosModel = require('../models/photosModel');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

for (let i = 0; i < 100; i += 1) {
  productsModel.writeProduct(
    getRandomInt(2),
    faker.commerce.price(),
    getRandomInt(5),
    getRandomInt(100),
    faker.commerce.productName(),
  );
}

for (let k = 0; k < 20; k += 1) {
  photosModel.writePhoto(faker.image.imageUrl(), getRandomInt(2));
}
